import React, { useState } from "react";
import { forms } from "../../data";
import formStyles from "./form.module.css";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { handleCustomFetch } from "../../utils";

export default function Form(props) {
  const { component = "" } = props || {};

  const navigate = useNavigate()

  const [passwordFieldType, setPasswordFieldType] = useState({
    password: "password",
    confirmPassword: "password"
  });


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    
    await handleCustomFetch(component, {
      method: "POST",
      body: formDataObj
    }, navigate)
  };



  return (
    <div className={formStyles?.form_container}>
      <form className={formStyles?.form} onSubmit={handleFormSubmit}>
        <div className={formStyles?.header_container}>
          <div className={formStyles?.header}>{forms?.[component]?.header?.title}</div>
        </div>
        <div className={formStyles?.inputs_container}>
          {forms?.[component]?.formFields?.map((formField) => {
            const {
              frontendSlug = "",
              id = 1,
              name = "",
              placeholder = "",
              type = "",
              required = true,
              fieldIcon = "",
              typeIcons = {}
            } = formField || {};

            return (
              <div
                className={formStyles?.input_container}
                key={`${id}-${frontendSlug}`}
              >
                <input
                  className={formStyles?.input}
                  placeholder={placeholder}
                  type={frontendSlug?.toLowerCase()?.includes?.("password") ? passwordFieldType?.[frontendSlug] : type}
                  name={name}
                  required={required}
                />
                <div className={formStyles?.input_field_icons}>
                  <FontAwesomeIcon icon={fieldIcon} />
                </div>
                {frontendSlug?.toLowerCase()?.includes("password") && (
                  <div
                    onClick={() => {
                      setPasswordFieldType((prevPasswordFieldType) => ({
                        ...prevPasswordFieldType,
                        [frontendSlug]:
                          prevPasswordFieldType?.[frontendSlug] === "password"
                            ? "text"
                            : "password",
                      }));
                    }}
                    className={formStyles?.input_password_icon}
                  >
                    <FontAwesomeIcon
                      icon={typeIcons?.[passwordFieldType?.[frontendSlug]]}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={formStyles?.link_container}>
          <div className={formStyles?.link_paragraph}>
            {forms?.[component]?.link?.label}
          </div>
          <Link className={formStyles?.link} to={forms?.[component]?.link?.linkRoute}>
            {forms?.[component]?.link?.labelWithLink}
          </Link>
        </div>
        <div className={formStyles?.button_container}>
          <button
            className={formStyles?.button}
            type={forms?.[component]?.button?.type}
          >
            {forms?.[component]?.button?.title}
          </button>
        </div>
      </form>
    </div>
  );
}

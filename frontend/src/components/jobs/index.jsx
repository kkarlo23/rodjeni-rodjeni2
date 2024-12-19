import React, { useState } from "react";

import jobsStyles from "./jobs.module.css";

import Modal from "../modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forms } from "../../data";

export default function Jobs() {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const handleAlterModalStatus = (frontendSlug) => {
    if (isModalOpen) setIsModalOpen(null);
    else setIsModalOpen(frontendSlug);
  };

  const handleButtonClickEvent = (openModal, frontendSlug) => {
    if (openModal) {
      handleAlterModalStatus(frontendSlug);
    } else return null;
  };

  return (
    <div className={jobsStyles?.jobs_wrapper}>
      <div className={jobsStyles?.jobs_container}>
      <div className={jobsStyles?.jobs_header_wrapper}>
        <div className={jobsStyles?.jobs_header_container}>
          <div className={jobsStyles?.jobs_header_logo_container}>
            <FontAwesomeIcon icon={forms?.jobs?.header?.logo?.icon} />
          </div>
          <div className={jobsStyles?.jobs_header_buttons_container}>
            {forms?.jobs?.header?.buttons?.map((buttonEntry) => {
              const {
                id = 1,
                frontendSlug = "",
                title = "",
                openModal = false,
              } = buttonEntry || {};

              return (
                <button
                  onClick={() =>
                    handleButtonClickEvent(openModal, frontendSlug)
                  }
                  className={jobsStyles?.jobs_header_button}
                  key={`${id}-${frontendSlug}`}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={jobsStyles?.modal_wrapper}>
          <Modal
            handleAlterModalStatus={handleAlterModalStatus}
            type={isModalOpen}
          />
        </div>
      )}
      <button onClick={() => handleAlterModalStatus("calendar")}>
        OPEN CALENDAR
      </button>
      </div>
    </div>
  );
}

import React from "react";

import errorStyles from "./error.module.css";

import { routes } from "../../routes";

import { useLocation, Link } from "react-router";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faC,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  const { pathname } = useLocation();

  return (
    <div className={errorStyles?.wrapper}>
      <div className={errorStyles?.container}>
        <div className={errorStyles?.icon_container}>
            <FontAwesomeIcon icon={faCircleExclamation}/>
        </div>
        <div className={errorStyles?.header_container}>
          <div className={errorStyles?.header}>404 - Not Found</div>
        </div>
        <div className={errorStyles?.error_description_container}>
          <div className={errorStyles?.error_description}>We can't seem to find the page you are looking for...</div>
        </div>
        <div>
          <div className={errorStyles?.path_indicator_container}>
            <div
              className={errorStyles?.path_indicator}
            >Invalid Path: <span>{pathname}</span></div>
          </div>
        </div>
        <Link
          className={errorStyles?.button_container}
          to={routes?.client?.login}
        >
          <button className={errorStyles?.button}>Login</button>
        </Link>
      </div>
    </div>
  );
}

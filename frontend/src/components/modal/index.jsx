import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { forms } from "../../data"

import modalStyles from "./modal.module.css"

export default function Modal(props) {

    const {
        handleAlterModalStatus,
        type = ""
    } = props || {}

    return (
        <div className={modalStyles?.modal_wrapper}>
            <div>{type}</div>
            <div onClick={() => handleAlterModalStatus()}>
                <FontAwesomeIcon icon={forms?.jobs?.[type]?.closeIcon}/>
            </div>
        </div>
    )
}
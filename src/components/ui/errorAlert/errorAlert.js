import React from 'react'
import './errorAlert.css'
export default function errorAlert(props) {
    return(
        <>
        <div className="errorAlert">{ props.errorAlertText } <span className="close-icon" onClick = { props.closeErrorAlert }></span></div>
        </>
    )
}
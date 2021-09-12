import React from 'react'
export default function State({state, closeModal, message}) {
    return(
        <>
        <div style={{ zIndex : 999999 }}className="app-modal-overlay">
    <div className="app-modal-div success" style={{ textAlign:'center'}}>
        {
            state == 'success' ?  <div > <div className="alert-icon"></div> <p className="alert-message">{message}</p> </div> : 
            
            <div> 
            <div  style={{ color: 'orange'}}  className="alert-icon failed"></div>
            <p className="alert-message" >{message}</p>
            </div>
            
        } 
     <div onClick={closeModal} style={{cursor:'pointer'}} className="app-modal-button">Close</div>
    </div>
  </div>
        </>
    )
}
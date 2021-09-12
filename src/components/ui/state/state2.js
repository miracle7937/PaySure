import React from 'react'
export default function State2({state, closeModal, closeSession, message, sessionId}) {
    return(
        <>
        <div style={{ zIndex : 999999 }}className="app-modal-overlay">
    <div className="app-modal-div success" style={{ textAlign:'center'}}>
        {
            state == 'success' ?  <div > <div className="alert-icon"></div>
             <p className="alert-message"  >{message}</p>
             <div style={{marginTop:'15px', fontSize:'13px'}}>{sessionId}</div>
            <div onClick={closeSession} style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Close</div>
             </div> : 
            
            <div> 
            <div style={{ color: 'orange'}} className="alert-icon failed"></div>
            <p className="alert-message" >{message}</p>
            <div onClick={closeModal} style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Try again</div>
            </div>    
        } 
    </div>
  </div>
        </>
    )
}
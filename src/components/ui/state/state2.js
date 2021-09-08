import React from 'react'
export default function State2({state, closeModal, closeSession, message, sessionId}) {
    return(
        <>
        <div style={{ zIndex : 999999 }}className="app-modal-overlay">
    <div className="app-modal-div success" style={{ textAlign:'center'}}>
        {
            state == 'success' ?  <div > <div className="alert-icon"></div>
             <div className="alert-message"  style={{width:'200px'}}>{message}</div>
             <div style={{marginTop:'15px', fontSize:'13px'}}>{sessionId}</div>
            <div onClick={closeSession} style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Close</div>
             </div> : 
            
            <div> 
            <div style={{ color: 'orange'}} className="alert-icon failed"></div>
            <div className="alert-message"  style={{width:'200px'}}>{message}</div>
            <div onClick={closeModal} style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Try again</div>
            </div>    
        } 
    </div>
  </div>
        </>
    )
}
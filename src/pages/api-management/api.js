
import React, { useState } from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import Request from './request'
import Services from './services'

export default function Provider() {
        
    const [ request, setRequest] = useState(false);
    const [ services, setServices] = useState(false);
;


    const changeRequest = () => {
      setRequest(true)
      setServices(false)  
    }

    const changeServices = () => {
      setRequest(false)
      setServices(true)  
    }


        return(
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
         <Link style={{ textDecoration: 'none'}} to="/service-providers"><div className="settings-icon"></div></Link> 
          <div onClick = { changeRequest } className="admin-top-barlinks admin-active-top-link">Request History</div>
          <div onClick = { changeServices } className="admin-top-barlinks">Manage API</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      { request ? <Request/> 
      : services ? <Services/>
      : <Request/> }


    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )
}

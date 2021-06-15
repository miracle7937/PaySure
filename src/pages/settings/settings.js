
import React, { useState, useEffect } from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import Bands from './band/bands'
import Terminal from './terminal/terminal'
import Services from '../services/services'
import Config from './config/config'
import { Redirect} from 'react-router-dom'

export default function Settings() {
    

  const [ bands, setBands] = useState(true);
  const [ services, setServices] = useState(false);
  const [ terminals, setTerminals] = useState(false);
  const [ config, setConfig] = useState(false);
    
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }


    const changeBands = () => {
      setBands(true)
      setServices(false)
      setTerminals(false) 
      setConfig(false)  
    }

    const changeServices = () => {
      setBands(false)
      setServices(true)
      setTerminals(false)
      setConfig(false) 
    }

    const changeTerminal = () => {
      setBands(false)
      setServices(false)
      setTerminals(true)  
      setConfig(false) 
    }
    const changeConfig = () => {
      setBands(false)
      setServices(false)
      setTerminals(false)  
      setConfig(true) 
    }

        return(
          <div>
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
         <Link style={{ textDecoration: 'none'}} to="/service-providers"><div className="settings-icon"></div></Link> 
         <div onClick = { changeBands } className={bands ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Bands</div>
         <div onClick = { changeServices } className={services ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Services</div>
          <div onClick = { changeTerminal } className={terminals ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Terminals</div>
          <div onClick = { changeConfig } className={config ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Service Configuration</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      { bands ? <Bands/> 
      : services ? <Services />
      : terminals ? <Terminal />
      : config ? <Config />
      : <Bands/> }

    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
    )
}

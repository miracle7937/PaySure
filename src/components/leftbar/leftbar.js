import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import './leftbar.css'
import paysureLogo from './paysure-logo.png'

export default function Login(props) {
 const [logout, setLogout] = useState(false)

 const Logout = () => {
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   setLogout(true)
 }
 if(logout){
   return <Redirect to="/" />;
 }
    return(
       <div>
         <div className="app-admin-brand"><img src={paysureLogo}  alt="" /></div>
      <nav>       
      <NavLink exact activeClassName= "active-link" to="/overview"> 
 <div className="admin-col-link-div">
      <div className="admin-col-1-links"></div>
        <div className="admin-col-link-text">Dashboard</div>
      </div>
      </NavLink> 
      <NavLink activeClassName= "active-link" to="/organisations"> 
 <div className="admin-col-link-div">
        <div className="admin-col-1-links"></div>
        <div className="admin-col-link-text">Organisations</div>
      </div>
</NavLink> 
      <NavLink activeClassName= "active-link" to="/service-providers"> 
 <div className="admin-col-link-div">
        <div className="admin-col-1-links"></div>
        <div className="admin-col-link-text">Providers</div>
      </div>
      </NavLink> 
      <NavLink activeClassName= "active-link" to="/transactions"> 
 <div className="admin-col-link-div">
        <div className="admin-col-1-links"></div>
        <div className="admin-col-link-text">Transactions</div>
      </div>
      </NavLink> 
      <NavLink activeClassName= "active-link" to="/settings"> 
      <div className="admin-col-link-div">
        <div className="admin-col-1-links"></div>
        <div className="admin-col-link-text">Settings</div>
      </div>
      </NavLink> 
      <NavLink activeClassName= "active-link" to="/user-management"> 
 <div className="admin-col-link-div">
        <div className="admin-col-1-links"></div>
        <div className="admin-col-link-text">User Management</div>
      </div>
      </NavLink> 

      </nav>


      <div onClick= { Logout } className="admin-col-logout" style={{ textAlign:'center', cursor: 'pointer' }}><span className="text-span-3"></span> Logout</div>
    </div>
    )
}


import React, { useState, useEffect } from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import Users from './users'
import Roles from './Roles/roles'
import { Redirect} from 'react-router-dom'
import { getUsers, getRoles } from '../../globalApi'

export default function User() {
        
    const [ users, setUsers] = useState(true);
    const [ roles, setRoles] = useState(false);
    const [admin, setAdmin] = useState([]);
    const [adminRoles, setAdminRoles] = useState([]);

    useEffect( () => {
      getUsers().then(result => { setAdmin(result)})
      getRoles().then(result => { setAdminRoles(result)})
    }, [])

    const changeUsers = () => {
      setUsers(true)
      setRoles(false)  
    }

    const changeRoles = () => {
      setUsers(false)
      setRoles(true)  
    }

    const updateUserList = (newUser) => {
      setAdmin([...admin, newUser])
      }

      const searchArray1 = (e) => {
  
        getUsers().then(result =>{
            const test = result.filter(result => {
            return result.username.toLowerCase().includes(e.target.value.toLowerCase());
          });
  
          setAdmin(test);
        
        } )
      }
        const searchArray2 = (e) => {
          getRoles().then(result =>{
              const test = result.filter(result => {
              return result.roleName.toLowerCase().includes(e.target.value.toLowerCase());
            });
    
            setAdminRoles(test);
          
          } )
        }
    
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
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
          <div onClick = { changeUsers }  className={users ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Users</div>
          <div onClick = { changeRoles }  className={roles ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Roles & Permissions</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
      { users ? <Users searchArray ={searchArray1} admin = { admin} updateUserList = {updateUserList} /> 
      : roles ? <Roles searchArray = {searchArray2} roles = { adminRoles }/>
      : <Users searchArray ={searchArray1} admin = { admin } /> }
    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
    )
}

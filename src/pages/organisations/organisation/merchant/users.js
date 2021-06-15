import React, { useState, useEffect } from 'react'
import AddPermission from './addPermission'
import {  getPermissionByUser, getPermissions } from '../../../../globalApi'
import EmptyData from '../../../../components/ui/emptyData/emptyData'

export default function Users({admin}) {
  const [role, setRole] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [permission, setPermission] = useState([]);
  const [ addPermission, setAddPermission] = useState(false)
  const [userData, setUserData] = useState({})


  useEffect(() => {
   getPermissions().then(result =>{ setPermissions(result)})
  }, [])
  
    const toggleAddPermission = async (result) => {
     await getPermissionByUser(result.username).then(result => setPermission(result))
      setUserData(result)
      addPermission ? setAddPermission(false) :  setAddPermission(true)
    }
    const closeAddPermission = async () => {

       addPermission ? setAddPermission(false) :  setAddPermission(true)
     }

    return (
    <>
              {
           addPermission ? <AddPermission permission={permission} userData={userData} permissions = {permissions}  closeModal = {closeAddPermission}/> : null
              }
          <div className="content-header">Users</div>
      <div className="content-sub">Here are the list of users</div>
      <div className="app-table-actions">
        <div className="app-table-search">
        <input type="text" className="app-input-search w-input"  placeholder="Search..." id="name" />
          </div>
        <div className="app-table-buttons">


        </div>
      </div>
      <div>
      {
                        admin.length <= 0 ? <EmptyData/> :
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                     <th className="app-table2-header"><input type = "checkbox" /></th>
                                     <th className="app-table2-header">Username</th>
                                    <th className="app-table2-header">Email Address</th>
                                    <th className="app-table2-header">Phone Number</th>
                                    <th className="app-table2-header">Roles</th>
                                    <th className="app-table2-header">Last seen</th>
                                    <th className="app-table2-header">Status</th>
                                    <th className="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>

                                    {
                                      admin.map( result => {
                                        return(
                                     <tr key={result.id} className="app-table2-row">
                                          <td className="app-table2-data"><input type = "checkbox" /></td>
                                          <td style={{textTransform: 'capitalize'}} className="app-table2-data">{result.username}</td>
                                        <td className="app-table2-data">{result.emailAddress}</td>
                                        <td className="app-table2-data">{result.phoneNumber}</td>
                                        <td className="app-table2-data">{result.roleName}</td>
                                        <td className="app-table2-data">{result.lastLoginDate}</td>
                                        { result.active == 1 ? 
                                          <td className="app-table2-data table-active">Active</td> 
                                        : 
                                        <td className="app-table2-data table-inactive">Inactive</td>
                                        }
                                         <td className="app-table2-data"><div onClick={() => {toggleAddPermission(result)}}  style={{cursor:'pointer',borderRadius:'5px',padding:"10px 15px",background:'#1b1b1b',color:'white'}}>Update</div></td>
                                  </tr>
                                        )
                                      })
                                    }
                                    
                                  </tbody>
                                  
                                  
                                  </table>
}
      </div>
    </>
    )
}
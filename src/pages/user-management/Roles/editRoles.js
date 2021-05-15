import React, { useState, useEffect } from 'react'
import Leftbar from '../../../components/leftbar/leftbar'
import Rightbar from '../../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import { Redirect, useParams} from 'react-router-dom'
import { getRole, getPermission, getPermissions } from '../../../globalApi'
import axios from 'axios'
import url from '../../../baseUrl.json'
import Caution from '../../../components/ui/caution/caution'
import AddPermission from './addPermission'
import Loader from '../../../components/ui/loader/loader'
import State from '../../../components/ui/state/state'
export default function User() {
        
    const [role, setRole] = useState({});
    const [permissions, setPermissions] = useState([]);
    const [permission, setPermission] = useState([]);
    const [ addPermission, setAddPermission] = useState(false)
    const [caution, setCaution] = useState(false)
    const [currentPerm, setCurrentPerm] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
   let { id } = useParams();

    useEffect( () => {
      getRole(id).then(result => setRole(result))
      getPermission(id).then(result => setPermission(result))
      getPermissions().then(result => setPermissions(result))
    }, [])

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }

    const toggleCaution = (result, index) => {
      setCurrentPerm(result)
      setCurrentIndex(index)
      caution ? setCaution(false) :  setCaution(true)
    }

    const removePermission = async() => {
      setCaution(false)
      setLoader(true)
      const local_token = localStorage.getItem('token');
      try {
          const result = await axios.delete(url.url + '/roles/removepermissions',
          {
            "roles": [id],
            "permissions": [currentPerm]
        }, {
            headers: {
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Methods": "GET, OPTIONS, HEAD, PUT, POST",
              'Authorization': `Bearer ${local_token}`,
              "Access-Control-Allow-Headers": "content-type, accept, authorization, cache-control, x-requested-with"
            }
          })
        if(result.data.responseCode === 0) {
          setLoader(false);
          setFormState(true);
          setFormStateType('success')
          permission.splice(currentIndex, 1);
          setPermission(permission) 
        }
        else {
          setLoader(false);
          setFormState(true);
          setFormStateType('failed')
        }
       }
       catch(e){console.log(e)}
    }

    const updatePermissionList = (newPerm) => {
      setPermission([...permission, ...newPerm])
      }
    
      const toggleAddPermission = () => {
        addPermission ? setAddPermission(false) :  setAddPermission(true)
      }
      const resetState = () => {
        setFormState(false)
      }
        return(
          <div>
            { formState ? <State closeModal={resetState} state = {formStateType} /> : null }
             { loader ? <Loader/> : null }
            {
              caution ? <Caution cancel = {toggleCaution}  confirm = { removePermission }/> : null
            }
        {
           addPermission ? <AddPermission permissions = {permissions} updatePermissionList = {updatePermissionList} closeModal = {toggleAddPermission}/> : null
              }
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
         <Link style={{ textDecoration: 'none'}} to="/user-management"><div className="settings-icon"></div></Link> 
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      <div className="app-table-actions">
        <div className="app-table-search">
          <div className="content-header">Manage Role</div>
          <div className="content-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
        </div>
        {/* <div className="app-table-buttons">
          <a href="/" className="table-button filter">Reset API<span className="table-button-icon"></span></a>
          <a href="#"className="table-button actions">Save Changes<span className="table-button-icon"></span></a>
        </div> */}
      </div>

      <div className="basic-table-card">
        <div className="content-header-2">Details</div>
        <div className="content-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
        <div className="role-descrip-div">
          <div className="role-descrip-div-col-1">
            <div className="form-block-2 w-form">
              <form id="email-form" name="email-form" data-name="Email Form">
                  <input value={role.roleName} type="text" className="app-text-field w-input" placeholder="Provider" id="name"/></form>
            </div>
          </div>
          <div className="role-descrip-div-col-2">
            <div className="form-block-2 w-form">
              <form id="email-form" name="email-form" data-name="Email Form">
                  <input value={role.roleDescription} type="text" className="app-text-field w-input"  placeholder="Commision" id="name-2"/></form>
            </div>
          </div>
        </div>
      </div>

      <div className="basic-table-card">
      <div className="table-header">
                  <div className="content-header-2">Permission</div>
                  <div onClick={toggleAddPermission} className="table-view-all">Add Permission</div>
                </div>
                {
                  permission.map((result, index) => {
                    return(
                      <div key={index} style={{marginRight:'20px',marginBottom:'20px', background: '#ededed', padding:'10px', borderRadius:'5px', display:'inline-block', color: '#696969', fontSize: '13px'}}>
                 {result} <span onClick={ ()=> { toggleCaution(result, index)}  } style={{ cursor: 'pointer', fontWeight: 'bold', color:'red', marginLeft:'10px'}}>X</span>
               </div>
                    )
                  })
                }
               
              </div>

    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
    )
}

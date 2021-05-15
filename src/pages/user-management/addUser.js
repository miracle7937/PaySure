import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
import State from '../../components/ui/state/state'
export default function AddUser(props) {
    
    const userForm = {
            username: "",
            password: "",
            emailAddress: "",
            phoneNumber: "",
            organisationCode: url.org_code,
            roleName: "admin"
    }

    const [ userData, setUserData] = useState(userForm)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const [message, setMessage] = useState('')


    const addUser = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/registers/user', userData, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
            props.updateUserList(userData);
            setMessage(user.data.responseMessage)
          setLoader(false);
          setFormState(true);
          setFormStateType('success')
          }
          else {
            setMessage(user.data.responseMessage)
            setLoader(false);
          setFormState(true);
          setFormStateType('failed')
          }
         }
         catch(e){console.log(e)}
    }

    const resetState = () => {
        setFormState(false)
    }
    return(
        <> 
        { loader? <Loader/> : null }
        {
            formState ? <State message={message} closeModal={resetState} state = {formStateType} /> :
              <div className="app-modal-overlay">
      <div className="app-modal-div">
         
      <div className="app-modal-heading">
        <div className="app-modal-header">Create User</div>
      </div>
      <div>
          <form onSubmit={ addUser }>
          <input onChange={ (e) => { setUserData({ ...userData, username: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
          <input onChange={ (e) => { setUserData({ ...userData, password: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Password"  required/>
          <input onChange={ (e) => { setUserData({ ...userData, emailAddress: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
          <input onChange={ (e) => { setUserData({ ...userData, phoneNumber: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
          <button type="submit" style={{marginTop:'20px',display:'block', cursor:'pointer'}} className="app-modal-button">Create User</button>
        </form>
      </div>
      <div onClick= {props.closeModal} className="app-modal-close"></div>
    </div>
  </div>
        }
      
        </>
    )
}
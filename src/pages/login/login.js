import React, { useState } from 'react'
import axios from 'axios'
import url from '../../baseUrl.json'
import ErrorAlert from '../../components/ui/errorAlert/errorAlert'
import { Redirect } from 'react-router-dom'
import Logo from './paysure-logo.png'
import Loader from '../../components/ui/loader/loader'
export default function Login(props) {

    const [username, setUsername] = useState('super')
    const [password, setPassword] = useState('SeconD@1')
    const [errorAlert, setErrorAlert] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [loader, setLoader] = useState(false)

    const closeErrorAlert = () => {
      setErrorText('');
      setErrorAlert(false);
    }

    const Login = async() => {
      setLoader(true)
     try {
        const user = await axios.post(url.url + '/login/auth', {
        "uniqueParameter" : username,
        "password": password
      })
      if(user.data.responseCode === 0) {
        // const currentUser = JSON.parse(user.data.data)
        setLoader(false)
      localStorage.setItem('user', JSON.stringify(user.data.data))
      localStorage.setItem('token', user.data.data.token)
      localStorage.setItem('tcP', 1)
      localStorage.setItem('tR', 10)
      localStorage.setItem('prov-tcP', 1)
      localStorage.setItem('prov-tR', 10)
      props.history.push('/overview')
      }
      else {
        setLoader(false)
        setErrorAlert(true);
        setErrorText(user.data.responseMessage)
      }
     }
     catch(e){console.log(e)}
    }

    const handleKeypress = e => {
      //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      Login();
    }
  };


    if (localStorage.getItem("token")) {
      return <Redirect to="/overview" />;
    }
        return(
            <div>
             <div className="app-login-section">
    <div className="app-login-col-1">
      <div className="app-login-bg-cover">
        <div className="app-login-logo"><img src={ Logo } loading="lazy" width="532" alt="" className="app-logo-img"/></div>
      </div>
    </div>
    <div className="app-login-col-2">
      { errorAlert ? <ErrorAlert closeErrorAlert = { closeErrorAlert } errorAlertText = { errorText } /> : null }
      { loader ? <Loader/> : null}
      <h2 className="login-header">Welcome Back!</h2>
      <div className="login-sub">Kindly fill in your credentials to login into your account.</div>
      <div className="w-form">
          <div className="app-login-form-group">
        <label className="login-label">Username</label>
        <input  onChange = { (event) => setUsername(event.target.value) } type="text" className="app-login-text-field w-input"  name="Username" data-name="Email address" placeholder="name@domain.com" required />
        </div>
          <div className="app-login-form-group">
              <label className="login-label">Password</label>
              <input onKeyPress={handleKeypress} onChange = { (event) => setPassword(event.target.value)} type="password" className="app-login-text-field w-input"  name="password" data-name="password" placeholder="xxxxxxxxxxxxx" required />
              </div>
      </div>
      <div className="app-login-button" onClick={Login}>Login into Account</div>
      <div className="app-login-divider"></div>
      <div className="app-login-notice">
        <div className="app-login-notice-col-1"></div>
        <div className="app-login-notice-col-2">Experiencing any problem with loging into your account ? Kindly contact the super admin to help resolve your issues.</div>
      </div>
    </div>
  </div>
            </div>
        )
    }

import React, { useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
export default function VerifyOtp() {

    let {id} = useParams()

    const [loader, setLoader] = useState(false)
    const [status, setStatus] = useState(false)
    const [state, setState] = useState('failed')
    const [message, setMessage] = useState("")
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [otpPhone, setOtpPhone] = useState('')
    const [newOtp, setNewOtp] = useState(false)


   async function verifyOtp(e) {
    e.preventDefault();
    setLoader(true);
        try {
            const result = await axios.post(process.env.REACT_APP_BACKEND_URL + '/verifyOTP?phoneNumber=' + phone + '&OTP=' + otp)

          if(result.data.responseCode === 0) {

            const result2 = await axios.get(process.env.REACT_APP_BACKEND_URL + '/verifyemail/' + id)

            if(result2.data.responseCode === 0){
                            setLoader(false);
            setStatus(true);
            setState('success');
            setMessage(result2.data.responseMessage)
          }
          
          else {
            setLoader(false);
            setStatus(true);
            setState('failed');
            setMessage(result2.data.responseMessage)
          }
            }

          else {
            setLoader(false);
            setStatus(true);
            setState('failed');
            setMessage(result.data.responseMessage)
          }
         }
         catch(e){
            setLoader(false);
            setStatus(true);
            setState('failed');
            setMessage("System Error")
        }
          
      }

      function closeStatus(){
        setStatus(false);
        setState('failed');
        setMessage('')
      }

      function switchToNewOtp(){
        setStatus(false);
        setState('failed');
        setMessage('')
        setNewOtp(true)
      }

     async function resendOtp(e){
        e.preventDefault();
        setLoader(true);
            try {
                const result = await axios.post(process.env.REACT_APP_BACKEND_URL + '/resendOTPRequest?phoneNumber=' + otpPhone)
    
              if(result.data.responseCode === 0) {
                setLoader(false);
                setNewOtp(false)
                setStatus(false);
                setState('failed');
                setMessage('')
              }
              else {
                setLoader(false);
                setNewOtp(false)
                setStatus(true);
                setState('failed');
                setMessage(result.data.responseMessage)
              }
             }
             catch(e){
                setLoader(false);
                setStatus(true);
                setState('failed');
                setMessage("System Error")
            }
      }



    return(
        <div>
              { loader? <Loader/> : null }
              
              <div className="verify-otp-content">
              <div className="verify-otp-div">
           {
               newOtp ?
               
               <form onSubmit={resendOtp}>
              <div className="verify-otp-div-header">Enter your Phone Number</div>
              <div className="verify-otp-div-sub">Fill in the credentials below to continue</div>
              <input onChange={ (e) => { setOtpPhone(e.target.value)}} type="text" class="app-text-field w-input"  placeholder="Phone Number" id="name" required/>
              <br/>
                 <button type="submit" style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Send OTP</button>
                 </form>  
                 :            
                 
                 <div>
                  {
                      status ?
                      <div style={{ textAlign:'center'}}>
                           {
            state == 'success' ? 
                      <div > <div className="alert-icon"></div>
                      <div className="alert-message"  style={{textAlign:'center'}}>{message}</div>
                      <Link to="/"><div style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Go to Login</div></Link> 
                      </div> : 
                     
                     <div> 
                     <div style={{ color: 'orange'}}  className="alert-icon failed"></div>
                     <div className="alert-message"  style={{textAlign:'center'}}>{message}</div>
                     <br/>
                     <div onClick={switchToNewOtp} style={{ cursor: 'pointer'}} className="resend-text"><span className="resend-icon"></span> Resend OTP</div>
                     <br/><br/>
                     <div onClick={closeStatus} style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Try again</div>
                     </div> 
}
                     </div>   : 
                <form onSubmit={verifyOtp}>
              <div className="verify-otp-div-header">Enter your OTP</div>
              <div className="verify-otp-div-sub">A code has been sent to your phone number, Kindly provide the code below to continue.</div>
              <input onChange={ (e) => { setPhone(e.target.value)}} type="text" class="app-text-field w-input"  placeholder="Phone Number" id="name" required/>
              <input onChange={ (e) => {setOtp(e.target.value)}} type="number" class="app-text-field w-input"  placeholder="Enter OTP" id="name" required/>
              <br/>
                 <button type="submit" style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Verify</button>
                 </form>
                  }
                  </div>

           }    


              </div>
              </div>    

              
        </div>
 
    )
}

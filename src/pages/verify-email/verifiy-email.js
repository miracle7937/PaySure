import React, { useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
export default function VerifyEmail() {

    let {id} = useParams()

    const [loader, setLoader] = useState(false)
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        verifyemail()
    }, [])

   async function verifyemail() {

        try {
            const result = await axios.get(process.env.REACT_APP_BACKEND_URL + '/verifyemail/' + id)

          if(result.data.responseCode === 0) {
            setLoader(false);
            setStatus(true);
            setMessage(result.data.responseMessage)
          }
          else {
            setLoader(false);
            setStatus(false);
            setMessage(result.data.responseMessage)
          }
         }
         catch(e){
            setLoader(false);
            setStatus(false);
            setMessage("System Error")
        }
          
      }

    return(
        <div>
              { loader? <Loader/> : 
              
              <div className="verify-content">
              <div className="verify-div">
                  { status ? 
                  <div>
                  <div className="alert-icon"></div> 
           
             <br/>
                   <div className="alert-message" >{message}</div>
                   <br/>
                   <Link to="/"><div style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Go to Login</div></Link> 
                  </div>
                   :  
                   <div>
                   <div style={{color: 'orange'}} className="alert-icon failed"></div> 
                   <br/>
                   <div className="alert-message" >{message}</div>
                   <br/>
                   <Link to={"/verifyotp/" + id }><div style={{marginTop:'15px',cursor:'pointer'}} className="app-modal-button">Verify Phone Number</div></Link> 
                  </div>
                   
                   }


              </div>
              </div>    
              
              }
              
        </div>
 
    )
}

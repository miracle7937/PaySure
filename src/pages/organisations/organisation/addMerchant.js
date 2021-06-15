import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../../baseUrl.json'
import Loader from '../../../components/ui/loader/loader'
import State2 from '../../../components/ui/state/state2'
import {  useParams} from 'react-router-dom'
export default function AddBrand(props) {
    
  let { id } = useParams();
    const merForm = {
        username: "",
        password: "",
        transactionPin:"",
        merchantName: "",
        contactPersonName: "",
        phoneNumber: "",
        emailAddress: "",
        logoUrl: "",
        bvn: "",
        accountType: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        lga: "",
        city: "",
        bandName: "",
        roleName: ""
    }

    const [ merData, setmerData] = useState(merForm)
    const [loader, setLoader] = useState(false)
    const [formState2, setFormState2] = useState(false)
    const [formStateType2, setFormStateType2] = useState('success')
    const [modalArray, setModalArray] = useState([])
    const [ip, setIp] = useState('')
    const [message, setMessage] = useState('')
    const [sessionId, setSessionId] = useState('')
   


    const addtoArray = () => {
        setIp('')
        setModalArray([...modalArray, ip])
    }

    const removePerm = (index) => {
     modalArray.splice(index, 1);
     setModalArray([...modalArray]) 
     
   };

    const CreateMer = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/b2b/register',
             {
                ...merData,
                organisationCode: id,
                ipAddresses: modalArray

            }, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
            setSessionId(user.data.sessionID)
            setMessage(user.data.responseMessage)
          setLoader(false);
          setFormState2(true);
          setFormStateType2('success')   
        
          }
          else {
            setMessage(user.data.responseMessage)
            setLoader(false);
          setFormState2(true);
          setFormStateType2('failed')
          
          }
         }
         catch(e){console.log(e)}
    }

    const resetState2 = () => {
      setFormState2(false)
  }
    return(
        <>
             { loader? <Loader/> : null } 
             {  formState2 ? <State2 sessionId={sessionId} message={message} closeModal={resetState2} closeSession={props.closeModal} state = {formStateType2} /> : null }
        
      <div className="app-modal-overlay">
      <div className="app-modal-div" style={{width:"70%", height: "90%", overflow:"auto"}}>
      <div className="app-modal-heading">
      <div className="app-modal-header">Create a Merchant</div>
    </div>
    <div>
        <form onSubmit={ CreateMer }>
        <div className="form-flex">
      <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, username: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, password: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Password"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, transactionPin: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Transaction Pin"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, merchantName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Merchant Name"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, contactPersonName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Contact Person Name"  required/>
       </div>
        <div className="form-flex-col"> 
        <input onChange={ (e) => { setmerData({ ...merData, phoneNumber: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, emailAddress: e.target.value  }) }} type="email" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, logoUrl: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Logo Url"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, bvn: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="BVN"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, addressLine1: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Address 1"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, addressLine2: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Address 2"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, state: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="State"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, lga: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="LGA"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, city: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="City"  required/>
        </div>
        <div className="form-flex-col">
        <select required style={{ marginBottom: '30px'}} onChange={ (e) => setmerData({ ...merData, bandName: e.target.value  })}  className="app-select w-select">
              <option value="0">Select a Band</option>
              {
                  props.bands.map(result => {
                      return <option key={result.id} value={ result.bandName }>{result.bandName}</option>
                  })
              }
        
            </select>
        </div>
        <div className="form-flex-col">
        <select required style={{ marginBottom: '30px'}} onChange={ (e) => setmerData({ ...merData, roleName: e.target.value  })}  className="app-select w-select">
              <option selected disabled>Select a Role</option>
              {
                  props.roles.map(result => {
                      return <option key={result.id} value={ result.roleName }>{result.roleName}</option>
                  })
              }
        
            </select>
        </div>
        <div className="form-flex-col">
        <input value = { ip } onChange={ (e) => { setIp(e.target.value)}} type="text" className="app-modal-form-field w-input"  placeholder="IP Address" />
        <div style={{marginRight:"20px",marginTop:"-59px",display:"inline-block", float:'right', cursor: 'pointer', textDecoration: 'underline', color:'#c00'}} onClick={addtoArray}>Add IP</div>
        <br/>
        {
                  modalArray.map((result, index) => {
                    return(
                      <div style={{marginTop:"-50px"}} key={result} style={{marginRight:'20px',marginBottom:'20px', background: '#ededed', padding:'10px', borderRadius:'5px', display:'inline-block', color: '#696969', fontSize: '13px'}}>
                 {result} <span onClick={()=>{ removePerm(index)}} style={{ cursor: 'pointer', fontWeight: 'bold', color:'red', marginLeft:'10px'}}>X</span>
               </div>
                    )
                  })
                }
        </div>        
</div>

         
<button type="submit" style={{cursor:'pointer'}} className="app-modal-button">Create Merchant</button>
</form>
    </div>

    <div onClick= {props.closeModal} className="app-modal-close"></div>
      </div>
      </div>
          
        </>
    )
}
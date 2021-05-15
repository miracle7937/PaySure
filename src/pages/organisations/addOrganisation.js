import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
import State from '../../components/ui/state/state'
import State2 from '../../components/ui/state/state2'

export default function AddBrand(props) {
    
      const orgForm = {
        id: -52572128,
        abbreviation: "",
        organisationName: "",
        contactPhoneNumber: "",
        contactAddress: "",
        contactEmailAddress: "",
        logoUrl: "",
        settlementBankName: "",
        settlementAccountName: "",
        settlementAccountNumber: "",
        settlementAccountType: "",
        settlementBvn: "",
        parentOrganisationCode: url.org_code
    }  

    const merForm = {
        username: "",
        password: "",
        merchantName: "",
        contactPersonName: "",
        phoneNumber: "",
        emailAddress: "",
        logoUrl: "",
        accountNumber: "",
        accountName: "",
        bankName: "",
        bvn: "",
        accountType: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        lga: "",
        city: "",
        bandName: "",
        roleName: "b2b"
    }

    const [ orgData, setorgData] = useState(orgForm)
    const [ merData, setmerData] = useState(merForm)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const [formState2, setFormState2] = useState(false)
    const [formStateType2, setFormStateType2] = useState('success')
    const [orgState, setOrgState] = useState(true)
    const [modalArray, setModalArray] = useState([])
    const [ip, setIp] = useState('')
    const [orgCode, setorgCode] = useState('')
    const [message, setMessage] = useState('')
   

    const addtoArray = () => {
        setIp('')
        setModalArray([...modalArray, ip])
    }

    const removePerm = (index) => {
     modalArray.splice(index, 1);
     setModalArray([...modalArray]) 
     
   };

    const CreateOrg = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/organisations', orgData, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
            setMessage(user.data.responseMessage)
            setorgData(orgForm)
          props.updateOrgList(user.data.data);
          setorgCode(user.data.data.organisationCode)
          setLoader(false);
          setFormState(true);
          setFormStateType('success')
          setOrgState(false)
         
          }
          else {
            setMessage(user.data.responseMessage)
            setLoader(false);
          setFormState(true);
          setFormStateType('failed')
          setOrgState(true)
         
          }
         }
         catch(e){console.log(e)}
    }


    const CreateMer = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/b2b/register',
             {
                ...merData,
                organisationCode: orgCode,
                ipAddresses: modalArray

            }, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
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

    const resetState = () => {
        setFormState(false)
    }
    const resetState2 = () => {
      setFormState2(false)
  }
    return(
        <>
             { loader? <Loader/> : null } 
             {  formState ? <State message={message} closeModal={resetState} state = {formStateType} /> : null }
             {  formState2 ? <State2 message={message} closeModal={resetState2} closeSession={props.closeModal} state = {formStateType2} /> : null }
         
               {
        orgState ?  
              <div className="app-modal-overlay">
      <div className="app-modal-div" style={{width:"70%", height: "90%", overflow:"auto"}}>
        <div className="app-modal-heading">
        <div className="app-modal-header">Create an Organisation</div>
      </div>
      <div>
          <form onSubmit={ CreateOrg }>
          <div className="form-flex">
        <div className="form-flex-col">
          <input value={orgData.abbreviation} onChange={ (e) => { setorgData({ ...orgData, abbreviation: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Abbreviation"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.organisationName} onChange={ (e) => { setorgData({ ...orgData, organisationName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Organisation Name"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.contactPhoneNumber} onChange={ (e) => { setorgData({ ...orgData, contactPhoneNumber: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.contactAddress} onChange={ (e) => { setorgData({ ...orgData, contactAddress: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Address"  required/>
         </div>
         <div className="form-flex-col">
          <input value={orgData.contactEmailAddress}  onChange={ (e) => { setorgData({ ...orgData, contactEmailAddress: e.target.value  }) }} type="email" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
          </div>
          <div className="form-flex-col"> 
          <input value={orgData.logoUrl}  onChange={ (e) => { setorgData({ ...orgData, logoUrl: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Logo Url"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.settlementBankName} onChange={ (e) => { setorgData({ ...orgData, settlementBankName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Bank Name"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.settlementAccountName} onChange={ (e) => { setorgData({ ...orgData, settlementAccountName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Account Name"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.settlementAccountNumber} onChange={ (e) => { setorgData({ ...orgData, settlementAccountNumber: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Account Number"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.settlementAccountType} onChange={ (e) => { setorgData({ ...orgData, settlementAccountType: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Account Type"  required/>
          </div>
          <div className="form-flex-col">
          <input value={orgData.settlementAccountType} onChange={ (e) => { setorgData({ ...orgData, settlementBvn: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="BVN"  required/>
          </div>
 </div>
 <button type="submit" style={{cursor:'pointer'}} className="app-modal-button">Create Organisation</button>
  </form>
      </div>
      <div onClick= {props.closeModal} className="app-modal-close"></div>
      </div>
      </div>
      : 
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
        <input onChange={ (e) => { setmerData({ ...merData, accountNumber: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Account Number"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, accountName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Account Name"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, bankName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Bank Name"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, bvn: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="BVN"  required/>
        </div>
        <div className="form-flex-col">
        <input onChange={ (e) => { setmerData({ ...merData, accountType: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Account Type"  required/>
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
        <option selected disabled>Select a Band</option>
              {
                  props.bands.map(result => {
                      return <option key={result.id} value={ result.bandName }>{result.bandName}</option>
                  })
              }
        
            </select>
        </div>
        {/* <div className="form-flex-col">
        <select required style={{ marginBottom: '30px'}} onChange={ (e) => setmerData({ ...merData, roleName: e.target.value  })}  className="app-select w-select">
              <option selected disabled>Select a Role</option>
              {
                  props.roles.map(result => {
                      return <option key={result.id} value={ result.roleName }>{result.roleName}</option>
                  })
              }
        
            </select>
        </div> */}
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

      </div>
      </div>
    }
          
        </>
    )
}
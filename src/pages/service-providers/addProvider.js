import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
import State from '../../components/ui/state/state'
export default function AddProvider(props) {
    
    const provForm = {
            abbreviation: "",
            providerName: ""
    }

    const [ provData, setprovData] = useState(provForm)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const [message, setMessage] = useState('')


    const AddProvider = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/services/providers', provData, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
            props.updateProviderList(provData);
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
        <div className="app-modal-header">Create Provider</div>
      </div>
      <div>
          <form onSubmit={ AddProvider }>
          <input onChange={ (e) => { setprovData({ ...provData, abbreviation: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Abbreviation"  required/>
          <input onChange={ (e) => { setprovData({ ...provData, providerName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Provider Name"  required/>
          <button type="submit" style={{marginTop:'20px',display:'block', cursor:'pointer'}} className="app-modal-button">Create Provider</button>
        </form>
      </div>
      <div onClick= {props.closeModal} className="app-modal-close"></div>
    </div>
  </div>
        }
      
        </>
    )
}
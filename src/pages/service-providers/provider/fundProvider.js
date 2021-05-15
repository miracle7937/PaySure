import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../../baseUrl.json'
import Loader from '../../../components/ui/loader/loader'
import State from '../../../components/ui/state/state'
import moment from 'moment'
export default function FundProvider(props) {
    
    const provForm = {
        amountFunded: 0,
        dateFunded: "",
        providerId: 1,
        serviceId: 0,
    }

    const [ provData, setprovData] = useState(provForm)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const [message, setMessage] = useState('')


    const FundProvider = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/services/providers/fund', provData, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
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
        <div className="app-modal-header">Fund Provider</div>
      </div>
      <div>
          <form onSubmit={ FundProvider }>
          <input onChange={ (e) => { setprovData({ ...provData, amountFunded: e.target.value  }) }} type="number" className="app-modal-form-field w-input"  placeholder="Amount"  required/>
          <input onChange={ async (e) => { let date = moment(e.target.value).format('DD-MM-YYYY');setprovData({ ...provData, dateFunded: date  }) }} type="date" className="app-modal-form-field w-input"  placeholder="Date"  required/>
          <select required style={{ marginBottom: '30px'}} onChange={ (e) => setprovData({ ...provData, serviceId: e.target.value  })}  className="app-select w-select">
              <option value="0">Select a Service</option>
              {
                  props.services.map(result => {
                      return <option key={result.id} value={ result.serviceId }>{result.serviceName}</option>
                  })
              }
        
            </select>
          <button type="submit" style={{marginTop:'20px',display:'block', cursor:'pointer'}} className="app-modal-button">Save Changes</button>
        </form>
      </div>
      <div onClick= {props.closeModal} className="app-modal-close"></div>
    </div>
  </div>
        }
      
        </>
    )
}
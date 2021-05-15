import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../../baseUrl.json'
import Loader from '../../../components/ui/loader/loader'
import State from '../../../components/ui/state/state'
export default function AddBrand(props) {
    
    const bandForm = {
         bandName: "",
        bandDescription: "",
        dailyCumulativeLimit: 0,
        airtimeLimit: 0,
        transferLimit: 0,
        withdrawalLimit: 0
    }
    const [ bandData, setBandData] = useState(bandForm)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const CreateBand = async(e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/bands', bandData, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
            props.updateBandList(user.data.data);
          setLoader(false);
          setFormState(true);
          setFormStateType('success')
          }
          else {
            setLoader(false);
          setFormState(true);
          setFormStateType('failed')
          }
         }
         catch(e){console.log(e)}
    }

    const resetState = () => {
        setFormState(false)
      props.closeModal()
    }
    return(
        <>
        {
            formState ? <State closeModal={resetState} state = {formStateType} /> :
              <div className="app-modal-overlay">
      <div className="app-modal-div">
          { loader? <Loader/> : null }
      <div className="app-modal-heading">
        <div className="app-modal-header">Create Band</div>
      </div>
      <div className="w-form">
          <form onSubmit={ CreateBand }>
          <input onChange={ (e) => { setBandData({ ...bandData, bandName: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Band Name"  required/>
          <input onChange={ (e) => { setBandData({ ...bandData, bandDescription: e.target.value  }) }} type="text" className="app-modal-form-field w-input"  placeholder="Band Description"  required/>
          <input onChange={ (e) => { setBandData({ ...bandData, dailyCumulativeLimit: e.target.value  }) }} type="number" className="app-modal-form-field w-input"  placeholder="Daily Cummulative Limit"  required/>
          <input onChange={ (e) => { setBandData({ ...bandData, airtimeLimit: e.target.value  }) }} type="number" className="app-modal-form-field w-input"  placeholder="Airtime Limit"  required/>
          <input onChange={ (e) => { setBandData({ ...bandData, transferLimit: e.target.value  }) }} type="number" className="app-modal-form-field w-input"  placeholder="Transfer Limit"  required/>
          <input onChange={ (e) => { setBandData({ ...bandData, withdrawalLimit: e.target.value  }) }} type="number" className="app-modal-form-field w-input"  placeholder="Withdrawal Limit"  required/>
          <button type="submit" style={{cursor:'pointer'}} className="app-modal-button">Create Band</button>
        </form>
      </div>
      <div onClick= {props.closeModal} className="app-modal-close"></div>
    </div>
  </div>
        }
      
        </>
    )
}
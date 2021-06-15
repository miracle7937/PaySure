import React, { useState, useEffect } from 'react'
import { getServiceCategory,getServiceProviders,getCategory } from '../../../globalApi';
import State2 from '../../../components/ui/state/state'
import Loader from '../../../components/ui/loader/loader'
import axios from 'axios'
import url from '../../../baseUrl.json'
export default function Config() {

    const feeForm = {
        "serviceId": 0,
        "providerCode": "",
        "isDiscountShareable": 1,
        "providerServiceCode": "",
        "providerServiceAlias": "",
        "serviceOperation": "",
        "providerDiscount": 0,
        "discountMaxCap": 0,
        "discountUnit": "Percentage",
        "paysureCoreCommission": 0,
        "merchantCommission": 0,
        "superMerchantCommission": 0,
        "isActive": 1
    }

    const [ feeData, setFeeData] = useState(feeForm);
    const [ category, setCategory] = useState([]);
    const [ services, setServices] = useState([]);
    const [ provider, setProvider] = useState([]);
    const [loader, setLoader] = useState(false);
    const [formState2, setFormState2] = useState(false)
    const [formStateType2, setFormStateType2] = useState('success')
    const [message, setMessage] = useState('')

    useEffect( () => {
          getServiceProviders().then(result => setProvider(result));
          getCategory().then(result => setCategory(result));
        }, [])
  
    const getServices = (service) => {
        setLoader(true)
        getServiceCategory(1,100,service).then((result) => {setServices(result.data); setLoader(false)});
        }

    const sendRequest = async (e) => {
        e.preventDefault();
        const sum = feeData.paysureCoreCommission + feeData.merchantCommission + feeData.superMerchantCommission
        console.log(feeData.paysureCoreCommission + feeData.merchantCommission + feeData.superMerchantCommission + "=" + sum)
        if( feeData.discountUnit == "Percentage" && sum == 100){
            runApi()
        }
        else if( feeData.discountUnit == "Value" && sum == feeData.providerDiscount){
            runApi()
        }
        else{
            if(feeData.discountUnit == "Percentage"){
                setMessage("Commission has to tally to 100%")
              setFormState2(true);
              setFormStateType2('failed')
            }
            else{
                setMessage("Commission has to tally to " + feeData.providerDiscount)
                setFormState2(true);
                setFormStateType2('failed');
              }
            }
            
        }
    const runApi = async() => {
        const local_token = localStorage.getItem('token');
                setLoader(true)
                try {
            const user = await axios.post(url.url + '/services/providers/fees/set',feeData, {
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
         catch(e){
             console.log(e);
             setMessage(e.message)
             setLoader(false);
             setFormState2(true);
             setFormStateType2('failed')
            }
    }

    const resetState2 = () => {
        setFormState2(false)
    }

    return (
    <>
     { loader ? <Loader/> : null }
     {  formState2 ? <State2 message={message} closeModal={resetState2} state = {formStateType2} /> : null }
          <div className="content-header">Config Service Fee</div>
      <div className="content-sub">Register service fee for provider</div>
      <form onSubmit={sendRequest}>
    <div className="form-flex">
    <div className="form-flex-col-3">
        <label className="login-label">Service Category</label>
          <select style={{ marginTop: '15px'}} onChange={ (e) => getServices(e.target.value)}  className="app-select w-select">
                                    <option>Select a Category</option>
                                      {
                                          category.map(result => {
                                              return <option key={result.id} value={ result.categoryName }>{result.categoryDescription}</option>
                                          })
                                      }
                                
                                    </select>
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Service</label>
          <select style={{ marginTop: '15px'}} onChange={ (e) => { setFeeData({ ...feeData, serviceId: parseInt(e.target.value)})} }   className="app-select w-select">
                                    <option>Select a Service</option>
                                      {
                                          services.map(result => {
                                              return <option key={result.id} value={ result.id }>{result.serviceName}</option>
                                          })
                                      }
                                
                                    </select>
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Provider</label>
        <select style={{ marginTop: '15px'}}  onChange={ (e) => { setFeeData({...feeData,providerCode: e.target.value })}}  className="app-select w-select">
                                    <option>Select a Provider</option>
                                      {
                                          provider.map(result => {
                                              return <option key={result.id} value={ result.providerCode }>{result.providerName}</option>
                                          })
                                      }
                                
                                    </select>
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Discount Shareable</label>
        <select  style={{ marginTop: '15px'}} onChange={ (e) => { setFeeData({...feeData,isDiscountShareable: parseInt(e.target.value) })}} className="app-select w-select">
        <option>Is Discount Shareable</option>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
        </select>
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Provider Service Code</label>
        <input onChange={ (e) => { setFeeData({...feeData,providerServiceCode: e.target.value })}} type="text" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Provider Service Alias</label>
        <input onChange={ (e) => { setFeeData({...feeData,providerServiceAlias: e.target.value })}} type="text" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Service Operation</label>
        <input onChange={ (e) => { setFeeData({...feeData,serviceOperation: e.target.value })}} type="text" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Discount Max Cap</label>
        <input onChange={ (e) => { setFeeData({...feeData,discountMaxCap: parseInt(e.target.value) })}} type="number" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Discount Unit</label>
        <select style={{ marginTop: '15px'}} onChange={ (e) => { setFeeData({...feeData,discountUnit: e.target.value })}} className="app-select w-select">
                                   <option value="Percentage">Select a Discount Unit</option>
                                    <option value="Percentage">Percentage</option>
                                    <option value="Value">Value</option>                                     
                                
                                    </select>
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Provider Discount</label>
        <input onChange={ (e) => { setFeeData({...feeData,providerDiscount: parseInt(e.target.value) })}} type="number" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Paysure Commission</label>
        <input onChange={ (e) => { setFeeData({...feeData,paysureCoreCommission: parseInt(e.target.value) })}} type="number" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Merchant Commission</label>
        <input onChange={ (e) => { setFeeData({...feeData,merchantCommission: parseInt(e.target.value) })}} type="number" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      <div className="form-flex-col-3">
        <label className="login-label">Super Merchant Commission</label>
        <input onChange={ (e) => { setFeeData({...feeData,superMerchantCommission: parseInt(e.target.value) })}} type="number" className="app-text-field w-input" required placeholder="Type Here" />
      </div>
      </div>
      <button type="submit" style={{marginTop:'20px',display:'block', cursor:'pointer'}} className="app-modal-button">Submit Config</button>
      </form>
    </>
    )
}
import React, { useState }  from 'react'
import { Redirect, useParams } from 'react-router-dom'
import MerForm from './addMerchant'
export default function Merchants(props) {

  const [ addMerch, setaddMerch] = useState(false)
  const [merchantRoute, setRoute] = useState(false)
  const [merchantCode, setMerchantCode] = useState('')

  let { id } = useParams();
  const toggleaddMerch = () => {
    addMerch ? setaddMerch(false) :  setaddMerch(true)
  }
  const toMerchant = (merchantCode) => {
    localStorage.setItem('orgCode', id)
    setRoute(true)
    setMerchantCode(merchantCode)
  }

    if(merchantRoute){
      return <Redirect to = { "/merchant/" + merchantCode} />;
    }
    return (
    <>
         { 
            addMerch ? <MerForm roles = {props.roles} updateList={props.updateList} bands={props.bands} closeModal = {toggleaddMerch}/> : null
         }
          <div className="content-header">Merchants</div>
      <div className="content-sub">Here are the list of merchants</div>
      <div className="app-table-actions">
                    <div className="app-table-search">
                        <input type="text" className="app-input-search w-input" placeholder="Search..." id="name" />
                    </div>
                    <div className="app-table-buttons">
                        <div style={{cursor:'pointer'}} onClick={ toggleaddMerch } className="table-button filter">Add New Merchant<span className="table-button-icon"></span></div>
                    </div>
                </div>
      <div>
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                     <th className="app-table2-header"><input type = "checkbox" /></th>
                                      <th className="app-table2-header">Merchant Code</th>
                                      <th className="app-table2-header">Merchant Name</th>
                                      <th className="app-table2-header">Email Address</th>
                                      <th className="app-table2-header">Phone Number</th>
                                      <th className="app-table2-header">Band</th>
                                   
                                    <th className="app-table2-header"></th>
                                  </tr>
                                  </thead>
  
                                  <tbody>
                                    {
                                      props.merchants.map( result => {
                                        return (
                                           <tr key={ result.id } className="app-table2-row">
                                          <td className="app-table2-data"><input type = "checkbox" /></td>
                                  <td className="app-table2-data">{result.merchantCode}</td>
                                      <td className="app-table2-data">{result.merchantName}</td>
                                      <td className="app-table2-data">{result.merchantEmailAddress}</td>
                                      <td className="app-table2-data">{result.merchantPhoneNumber}</td>
                                      <td className="app-table2-data">{result.band.bandName}</td>
                                      <td className="app-table2-data" style={{ color: '#131573', fontWeight: 'bold', cursor: 'pointer' }}>
                              <div onClick={ () => {toMerchant(result.merchantCode)} }>View Merchant <span className="app-icon"></span></div></td>
                                  </tr>
                                        )
                                      })
                                    }
                                     
                                  </tbody>
                                  
                                  
                                  </table>
      </div>
    </>
    )
}
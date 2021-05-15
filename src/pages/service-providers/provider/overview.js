import React, { useState }  from 'react'
import EditProvider from './editProvider'
import FundProvider from './fundProvider'
export default function Overview(props) {

  const [updateProvider, setEditProvider] = useState(false)
  const [fundWallet, setFundProvider] = useState(false)

      const toggleEditProvider = () => {
        updateProvider ? setEditProvider(false) :  setEditProvider(true)
      }
  
      const toggleFundProvider = () => {
        fundWallet ? setFundProvider(false) :  setFundProvider(true)
      }

    return(
    <>
                  {
               updateProvider ? <EditProvider provider = {props.provider} closeModal = {toggleEditProvider}/> :
               fundWallet ? <FundProvider services ={props.services} provider = {props.provider} closeModal = {toggleFundProvider}/> : null
              }
<div className="app-table-actions">
                    <div className="app-table-search">
                    <div className="content-header">{props.provider.providerName}</div>
<div className="content-sub">Here are the latest report on {props.provider.providerName}</div>
                    </div>
                    <div className="app-table-buttons">
                        <div onClick={toggleFundProvider} style={{cursor:'pointer'}} className="table-button filter">Fund Wallet<span className="table-button-icon"></span></div>
                        <div  onClick={toggleEditProvider}style={{cursor:'pointer', background:'#131573'}} className="table-button">Edit Provider<span className="table-button-icon"></span></div>
                    </div>
                </div>

<div data-animation="slide" data-duration="500" data-infinite="1" className="content-slider w-slider">
  <div className="mask w-slider-mask">
    <div className="content-slide w-slide">
      <div className="content-slide-box">
        <div className="content-info-card">
          <div className="div-block-2">
            <div className="slide-card-header">Wallet Balance</div>
            <div className="slide-card-value">₦{props.provider.balance}</div>
          </div>
          <div className="slide-card-icon green"></div>
        </div>
      </div>
    </div>
    <div className="content-slide w-slide">
      <div className="content-slide-box">
        <div className="content-info-card">
          <div className="div-block-2">
            <div className="slide-card-header">Total Funded</div>
            <div className="slide-card-value">₦{props.provider.totalFunded}</div>
          </div>
          <div className="slide-card-icon purple"></div>
        </div>
      </div>
    </div>
    <div className="content-slide w-slide">
      <div className="content-slide-box">
        <div className="content-info-card">
          <div className="div-block-2">
            <div className="slide-card-header">Transactions</div>
            <div className="slide-card-value">1000</div>
          </div>
          <div className="slide-card-icon blue"></div>
        </div>
      </div>
    </div>
    <div className="content-slide w-slide">
      <div className="content-slide-box">
        <div className="content-info-card">
          <div className="div-block-2">
            <div className="slide-card-header">Services</div>
            <div className="slide-card-value">12</div>
          </div>
          <div className="slide-card-icon red"></div>
        </div>
      </div>
    </div>
  </div>
  <div className="content-slider-left-arrow w-slider-arrow-left">
    <div className="w-icon-slider-left"></div>
  </div>
  <div className="content-slider-right-arrow w-slider-arrow-right">
    <div className="w-icon-slider-right"></div>
  </div>
  <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
</div>
<div className="basic-table-card">
          <div className="table-header">
            <div className="content-header-2">Recent Transactions</div>
            <div className="table-view-all">View all</div>
          </div>
          
          <table className="app-table">
                                  <thead>
                                      <tr className="app-table-row">
                                      <th className="app-table-header">Ref.ID</th>
                                      <th className="app-table-header">Trans.Type</th>
                                      <th className="app-table-header">Channel</th>
                                      <th className="app-table-header">Amount</th>
                                    <th className="app-table-header">Mer.Comsn</th>
                                    <th className="app-table-header">Paysure.Comsn</th>
                                    <th className="app-table-header">Trans-Status</th>
                                    <th className="app-table-header">Trans.Date</th>
                                  </tr>
                                  </thead>
                                  {/* <tbody>
                                  {
                                      props.transData.map( result => {
                                        return(
                                     <tr key={result.id} className="app-table-row">
                                          <td className="app-table-data">{result.transactionDate}</td>
                                        <td className="app-table-data">{result.transactionType}</td>
                                        <td className="app-table-data">{result.channel}</td>
                                        <td className="app-table-data">{result.amount}</td>
                                        <td className="app-table-data">{result.merchantCommission}</td>
                                        <td className="app-table-data">{result.paysureCoreCommission}</td>
                                        { result.transactionStatus == 0 ? 
                                          <td className="app-table-data table-active">Successful</td> 
                                        : 
                                        <td className="app-table-data table-inactive">Failed</td>
                                        }
                                        <td className="app-table-data">{result.transactionDate}</td>
                                  </tr>
                                        )
                                      })
                                    }
                                 
                                  </tbody> */}
                                  
                                  
                                  </table>
        </div>

    </>
    )
}



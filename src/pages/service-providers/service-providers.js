import React, { useState, useEffect }  from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Redirect, Link } from 'react-router-dom'
import { getServiceProviders, getServices } from '../../globalApi'
import AddProvider from './addProvider'
import EmptyData from '../../components/ui/emptyData/emptyData'

function ServiceProviders() {
  const [providers, setProviders] = useState([]);
  const [ createProvider, setAddProvider] = useState(false)
  const [updateProvider, setEditProvider] = useState(false)
  const [fundWallet, setFundProvider] = useState(false)
  const [provider, setProvider] = useState({})
  const [services, setServices] = useState([]);

    useEffect( () => {
      getServices().then(result => setServices(result));
      getServiceProviders().then(result => setProviders(result))
      },[])

      const toggleAddProvider = () => {
        createProvider ? setAddProvider(false) :  setAddProvider(true)
      }
  
      const toggleEditProvider = async (result) => {
        await setProvider(result)
        updateProvider ? setEditProvider(false) :  setEditProvider(true)
      }
  
      const toggleFundProvider = () => {
        fundWallet ? setFundProvider(false) :  setFundProvider(true)
      }

      const updateProviderList = (newData) => {
        setProviders([...providers, newData])
        }

        const searchArray = (e) => {
          getServiceProviders().then(result =>{
              const test = result.filter(result => {
              return result.providerName.toLowerCase().includes(e.target.value.toLowerCase());
            });
  
            setProviders(test);
          
          } )
            
      }
  
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
        return(
          
            <div className="app-admin-section">
              {
                createProvider ? <AddProvider updateProviderList = {updateProviderList} closeModal = {toggleAddProvider}/> : null
              }

            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
          <div className="settings-icon"></div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

            <div className="content-header">Service Providers</div>
      <div className="content-sub">Here are the list of paysure providers</div>
      <div className="app-table-actions">
      <div className="app-table-search">
        <input onChange={searchArray} type="text" className="app-input-search w-input" placeholder="Search..." id="name" />
          </div>
        <div className="app-table-buttons">
          <a href="#" onClick={toggleAddProvider} className="table-button filter">Add Providers<span className="table-button-icon"></span></a>
        </div>
      </div>
      {
                        providers.length <= 0 ? <EmptyData/> :
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                      <th className="app-table2-header">Provider Code</th>
                                      <th className="app-table2-header">Provider Name</th>
                                      <th className="app-table2-header">Wallet ID</th>
                                      <th className="app-table2-header">Balance</th>
                                      <th className="app-table2-header">Total Funded</th>
                                      <th className="app-table2-header">Created Date</th>
                                      <th className="app-table2-header"></th>

                                  </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      providers.map( result => {
                                        return (
                                           <tr key = {result.id} className="app-table2-row">
                                  <td className="app-table2-data">{result.providerCode}</td>
                                      <td className="app-table2-data">{result.providerName}</td>
                                      <td className="app-table2-data">{result.walletId}</td>
                                      <td className="app-table2-data">{result.balance}</td>
                                      <td className="app-table2-data">{result.totalFunded}</td>
                                      <td className="app-table2-data">{result.createdAt}</td>
                                    <Link to={"/service-provider/" + result.providerCode} style={{ textDecoration: 'none'}}>
                                    <td className="app-table2-data" style={{color: '#131573', fontWeight: 'bold', cursor: 'pointer'}}>
                                       <div>Manage Provider</div>
                                      </td>
                                    </Link>
                                      </tr>
                                        )
                                      })
                                    }
                                                                   
                                  </tbody>
                                  </table>
}
    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )

}

export default ServiceProviders ;
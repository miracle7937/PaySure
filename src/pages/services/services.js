import React, { useState, useEffect }  from 'react'
import { getServices, getServiceProviders, getServiceCategory,getCategory } from '../../globalApi'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
import State from '../../components/ui/state/state'
import EmptyData from '../../components/ui/emptyData/emptyData'

export default function Services(props) {
    const [services, setServices] = useState([]);
    const [providers, setProviders] = useState([]);
    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(false);
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')

    useEffect( () => {
        getServices().then(result => setServices(result));
        getServiceProviders().then(result => setProviders(result));
        getCategory().then(result => setCategory(result));
      }, [])
     
    const setDefault = async (providerCode, serviceCode) => {
      setLoader(true)
      const local_token = localStorage.getItem('token');
      try {
          const user = await axios.post(url.url + '/services/default/provider',
          {
            "providerCode": providerCode,
            "serviceCodes": [serviceCode]
          }, 
          {
              headers: {
                  'Authorization': `Bearer ${local_token}` 
                }
          })
        if(user.data.responseCode === 0) {

        setLoader(false);
        setFormState(true);
        setFormStateType('success')
        }
        else if(user.data.responseCode === 400 || 500 ) {
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

      const searchArray = (e) => {
        getServices().then(result =>{
            const test = result.filter(result => {
            return result.serviceName.toLowerCase().includes(e.target.value.toLowerCase());
          });

          setServices(test);
        
        } )
          
    }

    const getServiceCategoryFuc = (result) => {
      if( result == "All") {
        return getServices().then(result => setServices(result));
      }
      getServiceCategory(result).then(result => setServices(result));
    }
    
        return(
            <>
             { formState ? <State closeModal={resetState} state = {formStateType} /> : null }
             { loader ? <Loader/> : null }

            <div className="content-header">Services</div>
      <div className="content-sub">Here are the list of paysure providers</div>
      <div className="app-table-actions">
      <div className="app-table-search">
        <input onChange={searchArray} type="text" className="app-input-search w-input"  placeholder="Search..." id="name" />
          </div>
          <div className="app-table-buttons">
          <div className="styled">
          <select  onChange={ (e) => getServiceCategoryFuc(e.target.value)}  className="app-select w-select">
                                      <option selected disabled>Filter by Category</option>
                                      <option value="All">All</option>
                                      {
                                          category.map(result => {
                                              return <option key={result.id} value={ result.categoryName }>{result.categoryName}</option>
                                          })
                                      }
                                
                                    </select>
        </div>


        </div>
      </div>
      {
                        services.length <= 0 ? <EmptyData/> :
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                      <th className="app-table2-header">Service Code</th>
                                      <th className="app-table2-header">Service Name</th>
                                      <th className="app-table2-header">Category</th>
                                      <th className="app-table2-header">Default Provider</th>
                                      <th className="app-table2-header">Change Default Provider</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      {

                                      services.map(result => {
                                          return (
                                              <tr key={result.id} className="app-table2-row">
                                  <td className="app-table2-data">{result.serviceCode}</td>
                                      <td className="app-table2-data">{result.serviceName}</td>
                                      <td className="app-table2-data">{result.serviceCategory}</td>
                                      <td className="app-table2-data">{result.defaultProviderName}</td>
                                      <td className="app-table2-data">
                                    <select style={{ marginTop: '15px'}} onChange={ (e) => setDefault(e.target.value, result.serviceCode)}  className="app-select w-select">
                                    <option selected disabled>Select Default Provider</option>
                                      {
                                          providers.map(result => {
                                              return <option key={result.id} value={ result.providerCode }>{result.providerName}</option>
                                          })
                                      }
                                
                                    </select>
                                      </td>
                                  </tr>     
                                          )
                                      })

                                      }
                                                                  
                                  </tbody>
                                  </table>
}

</>
    )

}

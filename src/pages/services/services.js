import React, { useState, useEffect }  from 'react'
import { getServices,getServicesAll, getServiceProviders, getServiceCategory,getCategory } from '../../globalApi'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
import State from '../../components/ui/state/state'
import EmptyData from '../../components/ui/emptyData/emptyData'

export default function Services(props) {
    const [services, setServices] = useState([]);
    const [serDetails, setSerDetails] = useState({});
    const [providers, setProviders] = useState([]);
    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(false);
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const [newpage, setNewPage] = useState(0)
    const [newrecord, setNewRecord] = useState(10)

    let defaultPage = localStorage.getItem('ser-tcP')
    let defaultRecords = localStorage.getItem('ser-tR')
   
   

    useEffect( () => {
      setNewPage(defaultPage)
      setNewRecord(defaultRecords)
      getServicesAll(defaultPage,defaultRecords).then(async(result) => {
         setSerDetails(result); 
         setServices(result.data);
      });
     
        getServiceProviders().then(result => setProviders(result));
        getCategory().then(result => setCategory(result));
      }, [])


      const prevPage = () => {
        let currentPage = localStorage.getItem('ser-tcP');
        let defaultRecords = localStorage.getItem('ser-tR')

          let page = parseInt(currentPage) - 1;    
           console.log(currentPage)
          if(page > 0){
            setLoader(true)
          getServicesAll(page,defaultRecords).then(async(result) => { 
            setSerDetails(result); 
        
           setServices(result.data);
           setNewPage(page)
            setLoader(false)});
          }
          else{
            return false
          }
      }
      
      const nextPage = () => {
      let currentPage = localStorage.getItem('ser-tcP');
      let defaultRecords = localStorage.getItem('ser-tR')
        let page = parseInt(currentPage) + 1
        if(serDetails.lastPage >= page){
          setLoader(true)
           getServicesAll(page,defaultRecords).then(async(result) => {
            setSerDetails(result); 
           
            setServices(result.data);
            setNewPage(page)
              setLoader(false)});
        }
        else{
          return false
        }
      }
    
      const goToPage = (e) =>{
        let currentPage = localStorage.getItem('ser-tcP');
        if (e.key === 'Enter') {
        let defaultRecords = localStorage.getItem('ser-tR')
          if(serDetails.lastPage >= newpage){
            setLoader(true)
             getServicesAll(newpage,defaultRecords).then(async(result) => {
              setSerDetails(result); 
           setServices(result.data);
           setNewPage(newpage)
              setLoader(false)});
          }
          else{
            return false
          }
        }
        else{
          return false
        }
      }
    
      const modifyRecords = (e) =>{
        if (e.key === 'Enter') {
        if(serDetails.lastPage >= newpage){
          setLoader(true)
        getServicesAll(newpage,newrecord).then(async(result) => {
           setNewRecord(newrecord)
          setSerDetails(result); 
          setServices(result.data);
          setLoader(false)});
        }
        else{
          return false
        }
      }
      else{
        return false
      }
      }
     
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

    const getServiceCategoryFuc = async(result) => {
      let currentPage = localStorage.getItem('ser-tcP');
      let defaultRecords = localStorage.getItem('ser-tR')
      setLoader(true)
      if( result == "1") {
        return getServicesAll(defaultPage,defaultRecords).then(async(result) => {
          setSerDetails(result); 
          setServices(result.data);
          setLoader(false)
      })
    }
      await getServiceCategory(currentPage,defaultRecords,result).then(result =>  {setSerDetails(result); setServices(result.data);});
      setLoader(false)
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
                                      <option value='1'>All</option>
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
             <div className="pagination">
       <div className="pag-col-1">
         <div className="pag-s"><input onKeyDown={modifyRecords} value={newrecord}  onChange = { (event) => setNewRecord(event.target.value) } className="pag-input" type="number" name="page" max="13" /></div>
         <div className="pag-s"><span style={{marginRight:'10px'}} className="pag-s-text">of {serDetails.totalRecords}</span></div>
       </div>
       <div className="pag-col-2">
        <div className="pag-prev" onClick={ prevPage }>Previous Page</div>
        <div className="pag-next" onClick={ nextPage }>Next Page</div>
       </div>
       <div className="pag-col-3">
         <div className="pag-s"><span className="pag-s-text">Page</span></div>
         <div className="pag-s"><input onKeyDown={goToPage} value={newpage}  onChange = { (event) => setNewPage(event.target.value) } className="pag-input" type="number" name="page" max="13" /></div>
         <div className="pag-s"><span style={{marginRight:'10px'}} className="pag-s-text">of</span><span className="pag-s-text">{serDetails.lastPage}</span></div>
       </div>
      </div>

</>
    )

}

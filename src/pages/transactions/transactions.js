
import React, { useState, useEffect } from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import { Redirect} from 'react-router-dom'
import { getTransactionsAll,getServiceProviders } from '../../globalApi'
import Loader from '../../components/ui/loader/loader'
import ViewTrans from './viewTrans'
import ExportReport from '../Export'
import NumberFormat from 'react-number-format';
import EmptyData from '../../components/ui/emptyData/emptyData'
export default function Transactions() {
    
  const [transactions, setTransactions] = useState([]);
  const [alltransactions, setAllTransactions] = useState([]);
  const [transDetails, setTransDetails] = useState({});
  const [loader, setLoader] = useState(false);
 const [trans, setTrans] = useState({})
 const [viewTrans, setViewTrans] = useState(false)
 const [exportreport, setExport] = useState(false)
 const [newpage, setNewPage] = useState(0)
 const [newrecord, setNewRecord] = useState(10)
 const [providers, setProviders] = useState([]);
 const [ startDate, setStartDate] = useState()
 const [ endDate, setEndDate] = useState()


 let defaultPage = localStorage.getItem('tcP')
 let defaultRecords = localStorage.getItem('tR')


 
  useEffect(() => { 
    setNewPage(defaultPage)
    setNewRecord(defaultRecords)
    getTransactionsAll(defaultPage,defaultRecords).then(async(result) => {
       setTransDetails(result); 
       const res = await result.data.sort(function(a, b) {
        var c = new Date(a.transactionDate);
        var d = new Date(b.transactionDate);
        return d-c;
    });
      setTransactions(res)});
      getServiceProviders().then(result => setProviders(result));
  }, [])

  const getTrans = async(result) => {
  await setTrans(result)
   viewTrans ? setViewTrans(false) :  setViewTrans(true)
  }
  
  const toggleTrans = () => {
    viewTrans ? setViewTrans(false) :  setViewTrans(true)
  }

  const toggleExport = async() => {
    setLoader(true)
    await getTransactionsAll(1,transDetails.totalRecords).then(async(result) => {
     setAllTransactions(result.data)});
     setLoader(false)
    exportreport ? setExport(false) :  setExport(true)
  }

  const prevPage = () => {
    let currentPage = localStorage.getItem('tcP');
    let defaultRecords = localStorage.getItem('tR')
      let page = parseInt(currentPage) - 1
      if(page > 0){
        setLoader(true)
      getTransactionsAll(page,defaultRecords).then(async(result) => { 
        setTransDetails(result); 
        const res = await result.data.sort(function(a, b) {
         var c = new Date(a.transactionDate);
         var d = new Date(b.transactionDate);
         return d-c;
     });
       setTransactions(res);
       setNewPage(page)
        setLoader(false)});
      }
      else{
        return false
      }
  }
  
  const nextPage = () => {
  let currentPage = localStorage.getItem('tcP');
  let defaultRecords = localStorage.getItem('tR')
    let page = parseInt(currentPage) + 1
    if(transDetails.lastPage >= page){
      setLoader(true)
       getTransactionsAll(page,defaultRecords).then(async(result) => {
        setTransDetails(result); 
        const res = await result.data.sort(function(a, b) {
         var c = new Date(a.transactionDate);
         var d = new Date(b.transactionDate);
         return d-c;
     });
       setTransactions(res);
       setNewPage(page)
          setLoader(false)});
    }
    else{
      return false
    }
  }

  const goToPage = (e) =>{
    if (e.key === 'Enter') {
    let defaultRecords = localStorage.getItem('tR')
      if(transDetails.lastPage >= newpage){
        setLoader(true)
         getTransactionsAll(newpage,defaultRecords).then(async(result) => {
          setTransDetails(result); 
          const res = await result.data.sort(function(a, b) {
           var c = new Date(a.transactionDate);
           var d = new Date(b.transactionDate);

           return d-c;
       });
         setTransactions(res)
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
    if(transDetails.lastPage >= newpage){
      setLoader(true)
    getTransactionsAll(newpage,newrecord).then(async(result) => {
      
      setTransDetails(result); 
      const res = await result.data.sort(function(a, b) {
       var c = new Date(a.transactionDate);
       var d = new Date(b.transactionDate);
       return d-c;
   });
     setTransactions(res)
     setNewPage(newpage)
     setNewRecord()
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

     

  const filterByStatus = (status) =>{
    if( status == "All") {
      setLoader(true)
      return getTransactionsAll(1,10).then(async(result) => {
        setTransDetails(result); 
        const res = await result.data.sort(function(a, b) {
         var c = new Date(a.transactionDate);
         var d = new Date(b.transactionDate);
         return d-c;
     });
       setTransactions(res)
       let currentPage = localStorage.getItem('tcP');
       let defaultRecords = localStorage.getItem('tR')
       setNewPage(currentPage)
       setNewRecord(defaultRecords)
       setLoader(false)
      });
      
    }
    setLoader(true)
          getTransactionsAll(1,transDetails.totalRecords).then(async(result) => {
      setTransDetails(result); 
      const res = await result.data.sort(function(a, b) {
       var c = new Date(a.transactionDate);
       var d = new Date(b.transactionDate);
       return d-c;
   });
     const trans = res.filter( x => { return x.transactionStatus == status})
     setTransactions(trans)});
     let currentPage = localStorage.getItem('tcP');
     let defaultRecords = localStorage.getItem('tR')
     setNewPage(currentPage)
     setNewRecord(defaultRecords)
     setLoader(false)
  }


  const filterByProvider = (provider) =>{
    let currentPage = localStorage.getItem('tcP');
    let defaultRecords = localStorage.getItem('tR')
    if( provider == "0") {
      setLoader(true)
      return getTransactionsAll(1,10).then(async(result) => {
        setTransDetails(result); 
        const res = await result.data.sort(function(a, b) {
         var c = new Date(a.transactionDate);
         var d = new Date(b.transactionDate);
         return d-c;
     });
       setTransactions(res)
       let currentPage = localStorage.getItem('tcP');
       let defaultRecords = localStorage.getItem('tR')
       setNewPage(currentPage)
       setNewRecord(defaultRecords)
       setLoader(false)
      }
       
       );
      
    }
    setLoader(true)
    getTransactionsAll(1,transDetails.totalRecords).then(async(result) => {
      setTransDetails(result); 
      const res = await result.data.sort(function(a, b) {
       var c = new Date(a.transactionDate);
       var d = new Date(b.transactionDate);
       return d-c;
   });
     const trans = res.filter( x => { return x.providerName == provider})
     setTransactions(trans);
     let currentPage = localStorage.getItem('tcP');
     let defaultRecords = localStorage.getItem('tR')
     setNewPage(currentPage)
     setNewRecord(defaultRecords)
     setLoader(false)});
  }

  const filterByDate = async (e) => {
    e.preventDefault();
    setLoader(true)
    await getTransactionsAll(1,transDetails.totalRecords).then(async(result) => {
      setTransDetails(result); 
const newTrans = await result.data.filter(item => {
   const transDate = new Date(item.transactionDate).toISOString().substr(0,10);
   return transDate >= startDate && transDate <= endDate;
})
setTransactions(newTrans);
let currentPage = localStorage.getItem('tcP');
let defaultRecords = localStorage.getItem('tR')
setNewPage(currentPage)
setNewRecord(defaultRecords)
setLoader(false);
});

}

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }

        return(
          <div>
            <div className="app-admin-section">
            { viewTrans ? <ViewTrans trans={trans} closeModal={toggleTrans}/> : null }
            {exportreport ? <ExportReport alltransactions={alltransactions} closeModal={toggleExport}/> : null}
            { loader ? <Loader/> : null }
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
         <Link style={{ textDecoration: 'none'}} to="/service-providers"><div className="settings-icon"></div></Link> 
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
      <div className="app-table-actions">
                    <div className="app-table-search">
                    <div className="content-header">Paysure Core - Transactions</div>
                    <div className="content-sub">Here are the latest report on Paysure Core</div>
                    </div>
                    <div className="app-table-buttons">
                    {
                         transactions.length <= 0 ? '' : 
                         <div onClick={toggleExport} style={{cursor:'pointer'}} className="table-button filter">Export Report<span className="table-button-icon"></span></div>

                      }                    </div>
                </div>
                {
              transactions.length <= 0 ? <EmptyData/> :
                <div>
      <div className="app-table-actions">
        <div>
          <form className="app-table-select" onSubmit={filterByDate}>
                   <input onChange = { (event) => setStartDate(event.target.value) } style={{ marginRight:'20px',width:'40%'}} type="date" className="app-modal-form-field w-input"   required/>
        <input onChange = { (event) => setEndDate(event.target.value) } style={{ marginRight:'20px',width:'40%'}}  type="date" className="app-modal-form-field w-input"   required/>
        <button type="submit" style={{fontSize:'15px',cursor:'pointer',height:'40px'}} className="app-icon table-button filter"><span className="table-button-icon"></span></button> 
          </form>

          </div>
        <div className="app-table-select">
                  <select style={{ marginRight:'20px'}}  onChange={ (e) => filterByStatus(e.target.value)}  className="app-select w-select">
                                      <option selected disabled>Filter by Status</option>
                                      <option value="All">All</option>
                                      <option value="0">Successful</option>
                                      <option value="1">Failed</option>
                                    </select>
                                    <select  onChange={ (e) => filterByProvider(e.target.value)}  className="app-select w-select">
                                      <option selected disabled>Filter by Provider</option>
                                      <option value="All">All</option>
                                      {
                                          providers.map(result => {
                                              return <option key={result.id} value={ result.providerName }>{result.providerName}</option>
                                          })
                                      }
                                
                                    </select>

        </div>
      </div>
      <div>
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                      <th className="app-table2-header">Provider</th>
                                      <th className="app-table2-header">Channel</th>
                                      <th className="app-table2-header">Service</th>
                                      <th className="app-table2-header">Total Amount</th>
                                    <th className="app-table2-header">Trans-Status</th>
                                    <th className="app-table2-header">Trans.Date</th>
                                    <th className="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      transactions.map( result => {
                                        return(
                                     <tr key={result.id} className="app-table2-row">
                                        <td className="app-table2-data">{result.providerName}</td>
                                        <td className="app-table2-data">{result.channel}</td>
                                        <td className="app-table2-data">{result.serviceName}</td>
                                        <td className="app-table2-data">
                                        <NumberFormat value={result.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                                          </td>
                                        { result.transactionStatus == 0 ? 
                                          <td className="app-table2-data table-active">Successful</td> 
                                        : 
                                        <td className="app-table2-data table-inactive">Failed</td>
                                        }
                                        <td className="app-table2-data">{result.transactionDate}</td>
                                        <td className="app-table2-data" style={{ color: '#131573', fontWeight: 'bold', cursor: 'pointer' }}>
                                        <div onClick={ () => { getTrans(result)}}>View Details <span className="app-icon"></span></div>
                                        </td>
                                  </tr>
                                        )
                                      })
                                    }                                
                                  </tbody>                  
                                  </table>
      </div>
             <div className="pagination">
       <div className="pag-col-1">
         <div className="pag-s"><input onKeyDown={modifyRecords} value={newrecord}  onChange = { (event) => setNewRecord(event.target.value) } className="pag-input" type="number" name="page" max="13" /></div>
         <div className="pag-s"><span style={{marginRight:'10px'}} className="pag-s-text">of {transDetails.totalRecords}</span></div>
       </div>
       <div className="pag-col-2">
        <div className="pag-prev" onClick={ prevPage }>Previous Page</div>
        <div className="pag-next" onClick={ nextPage }>Next Page</div>
       </div>
       <div className="pag-col-3">
         <div className="pag-s"><span className="pag-s-text">Page</span></div>
         <div className="pag-s"><input onKeyDown={goToPage} value={newpage}  onChange = { (event) => setNewPage(event.target.value) } className="pag-input" type="number" name="page" max="13" /></div>
         <div className="pag-s"><span style={{marginRight:'10px'}} className="pag-s-text">of</span><span className="pag-s-text">{transDetails.lastPage}</span></div>
       </div>
      </div>
</div>
}

    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
    )
}

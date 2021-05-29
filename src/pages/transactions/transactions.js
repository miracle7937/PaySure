
import React, { useState, useEffect } from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import { Redirect} from 'react-router-dom'
import { getTransactionsAll } from '../../globalApi'
import Loader from '../../components/ui/loader/loader'
import ViewTrans from './viewTrans'
import ExportReport from '../Export'
import NumberFormat from 'react-number-format';
export default function Transactions() {
    
  const [transactions, setTransactions] = useState([]);
  const [transDetails, setTransDetails] = useState({});
  const [loader, setLoader] = useState(false);
 const [trans, setTrans] = useState({})
 const [viewTrans, setViewTrans] = useState(false)
 const [exportreport, setExport] = useState(false)
 const [newpage, setNewPage] = useState(0)
 const [newrecord, setNewRecord] = useState(10)
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
        console.log('date', new Date(b.transactionDate) + '' + new Date(a.transactionDate))
        return d-c;
    });
      setTransactions(res)});
  }, [])

  const getTrans = async(result) => {
  await setTrans(result)
   console.log('trans',trans)
   viewTrans ? setViewTrans(false) :  setViewTrans(true)
  }
  
  const toggleTrans = () => {
    viewTrans ? setViewTrans(false) :  setViewTrans(true)
  }

  const toggleExport = () => {
    exportreport ? setExport(false) :  setExport(true)
  }

  const prevPage = () => {
    let currentPage = localStorage.getItem('tcP');
    let defaultRecords = localStorage.getItem('tR')
      let page = parseInt(currentPage) - 1
      if(transDetails.lastPage <= page){
        setLoader(true)
      getTransactionsAll(page,defaultRecords).then(async(result) => { 
        setTransDetails(result); 
        const res = await result.data.sort(function(a, b) {
         var c = new Date(a.transactionDate);
         var d = new Date(b.transactionDate);
         console.log('date', new Date(b.transactionDate) + '' + new Date(a.transactionDate))
         return d-c;
     });
       setTransactions(res);

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
         console.log('date', new Date(b.transactionDate) + '' + new Date(a.transactionDate))
         return d-c;
     });
       setTransactions(res);
          
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
           console.log('date', new Date(b.transactionDate) + '' + new Date(a.transactionDate))
           return d-c;
       });
         setTransactions(res)
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
       console.log('date', new Date(b.transactionDate) + '' + new Date(a.transactionDate))
       return d-c;
   });
     setTransactions(res)
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

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }

        return(
          <div>
            <div className="app-admin-section">
            { viewTrans ? <ViewTrans trans={trans} closeModal={toggleTrans}/> : null }
            {exportreport ? <ExportReport transactions={transactions} closeModal={toggleExport}/> : null}
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
      <div className="content-header">Paysure Agency - Transactions</div>
      <div className="content-sub">Here are the latest report on Paysure Agency</div>
      <div className="app-table-actions">
        <div className="app-table-search">
        <input type="text" className="app-input-search w-input"  placeholder="Search..." id="name" />
          </div>
        <div className="app-table-buttons">

          {/* <a href="#" className="table-button sort">Sort <span className="table-button-icon"></span></a>
          <a href="#" className="table-button filter">Filter <span className="table-button-icon"></span></a>
          <a href="#" className="table-button actions">Actions <span className="table-button-icon"></span></a> */}
          {/* <div className="styled">
        <select>
                <option>Sort</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>

        <div className="styled">
        <select>
                <option>Filter</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>


        <div className="styled">
        <select>
                <option>Actions</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div> */}
         <div onClick={toggleExport} style={{cursor:'pointer'}} className="table-button filter">Export Report<span className="table-button-icon"></span></div>

        </div>
      </div>
      <div>
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                      <th className="app-table2-header">Trans.Type</th>
                                      <th className="app-table2-header">Channel</th>
                                      <th className="app-table2-header">Amount</th>
                                    <th className="app-table2-header">Mer.Comsn</th>
                                    <th className="app-table2-header">Paysure.Comsn</th>
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
                                        <td className="app-table2-data">{result.transactionType}</td>
                                        <td className="app-table2-data">{result.channel}</td>
                                        <td className="app-table2-data">
                                        <NumberFormat value={result.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                                          </td>
                                        <td className="app-table2-data">
                                        <NumberFormat value={result.merchantCommission} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                                          </td>
                                        <td className="app-table2-data">
                                        <NumberFormat value={result.paysureCoreCommission} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} /></td>
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
     {
       transDetails.totalRecords > newrecord ?
             <div className="pagination">
       <div className="pag-col-1">
         <div className="pag-s"><input onKeyDown={modifyRecords} value={newrecord}  onChange = { (event) => setNewRecord(event.target.value) } className="pag-input" type="number" name="page" max="13" /></div>
         <div className="pag-s"><span style={{marginRight:'10px'}} className="pag-s-text">Records per page</span></div>
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
      </div> : ''
     }


    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
    )
}

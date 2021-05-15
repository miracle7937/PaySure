
import React, { useState, useEffect } from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import { Redirect} from 'react-router-dom'
import { getTransactions } from '../../globalApi'
import ViewTrans from './viewTrans'
export default function Transactions() {
    
  const [transactions, setTransactions] = useState([]);
 const [trans, setTrans] = useState({})
 const [viewTrans, setViewTrans] = useState(false)

  useEffect( () => {
    getTransactions().then(result => { console.log('result',result); setTransactions(result)});
  }, [])

  const getTrans = async(result) => {
  await setTrans(result)
   console.log('trans',trans)
   viewTrans ? setViewTrans(false) :  setViewTrans(true)
  }
  
  const toggleTrans = () => {
    viewTrans ? setViewTrans(false) :  setViewTrans(true)
  }

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }

        return(
          <div>
            <div className="app-admin-section">
            { viewTrans ? <ViewTrans trans={trans} closeModal={toggleTrans}/> : null }
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
                                        <td className="app-table2-data">{result.amount}</td>
                                        <td className="app-table2-data">{result.merchantCommission}</td>
                                        <td className="app-table2-data">{result.paysureCoreCommission}</td>
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

    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</div>
    )
}

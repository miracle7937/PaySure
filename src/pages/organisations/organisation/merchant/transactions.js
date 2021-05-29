import React from 'react'

export default function Transactions({trans}) {

    return (
    <>
          <div className="content-header">Paysure Agency - Transactions</div>
      <div className="content-sub">Here are the latest report on Paysure Agency</div>
      <div className="app-table-actions">
        <div className="app-table-search">
        <input type="text" className="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name" />
          </div>
        <div className="app-table-buttons">
          {/* <a href="#" className="table-button sort">Sort <span className="table-button-icon"></span></a>
          <a href="#" className="table-button filter">Filter <span className="table-button-icon"></span></a>
          <a href="#" className="table-button actions">Actions <span className="table-button-icon"></span></a> */}
          <div className="styled">
        <select>
                <option selected>Sort</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>

        <div className="styled">
        <select>
                <option selected>Filter</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>


        <div className="styled">
        <select>
                <option selected>Actions</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>

        </div>
      </div>
      <div>
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                     <th className="app-table2-header"><input type = "checkbox" /></th>
                                      <th className="app-table2-header">Ref.ID</th>
                                      <th className="app-table2-header">Trans.Type</th>
                                      <th className="app-table2-header">Channel</th>
                                      <th className="app-table2-header">Amount</th>
                                    <th className="app-table2-header">Mer.Comsn</th>
                                    <th className="app-table2-header">Paysure.Comsn</th>
                                    <th className="app-table2-header">Trans-Status</th>
                                    <th className="app-table2-header">Trans.Date</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      trans.map( result => {
                                        return(
                                     <tr key={result.id} className="app-table2-row">
                                          <td className="app-table2-data"><input type = "checkbox" /></td>
                                          <td className="app-table2-data">{result.transactionDate}</td>
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
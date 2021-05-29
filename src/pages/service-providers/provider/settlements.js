import React from 'react'

export default function Settlements() {

    return (
    <>
          <div className="content-header">Settlements</div>
      <div className="content-sub">Here are the latest report on this Provider</div>
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
                                      <th className="app-table2-header">Trans.Details</th>
                                      <th className="app-table2-header">Api/Provider</th>
                                      <th className="app-table2-header">Amount</th>
                                    <th className="app-table2-header">Commission</th>
                                    <th className="app-table2-header">T-Status</th>
                                    <th className="app-table2-header">P-Status</th>
                                    <th className="app-table2-header">Date</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr className="app-table2-row">
                                          <td className="app-table2-data"><input type = "checkbox" /></td>
                                  <td className="app-table2-data">PA-2U3-49</td>
                                      <td className="app-table2-data">Lorem Ipsum</td>
                                      <td className="app-table2-data">Transfer</td>
                                      <td className="app-table2-data">N20,000</td>
                                      <td className="app-table2-data">3%</td>
                                      <td className="app-table2-data" style={{color: '#7fe233'}}>Active</td>
                                      <td className="app-table2-data" style={{color: '#7fe233'}}>Active</td>
                                      <td className="app-table2-data">12/08/20</td>
                                  </tr>
                                  <tr className="app-table2-row">
                                          <td className="app-table2-data"><input type = "checkbox" /></td>
                                  <td className="app-table2-data">PA-2U3-49</td>
                                      <td className="app-table2-data">Lorem Ipsum</td>
                                      <td className="app-table2-data">Transfer</td>
                                      <td className="app-table2-data">N20,000</td>
                                      <td className="app-table2-data">3%</td>
                                      <td className="app-table2-data" style={{color: '#7fe233'}}>Active</td>
                                      <td className="app-table2-data" style={{color: '#7fe233'}}>Active</td>
                                      <td className="app-table2-data">12/08/20</td>
                                  </tr>
                                  </tbody>
                                  
                                  
                                  </table>
      </div>
    </>
    )
}
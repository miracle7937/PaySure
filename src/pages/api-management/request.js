import React from 'react'

export default function Request() {

    return (
    <>
          <div class="content-header">Api Request History</div>
      <div class="content-sub">Here are the list of api requests</div>
      <div class="app-table-actions">
        <div class="app-table-search">
        <input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name" />
          </div>
        <div class="app-table-buttons">
          {/* <a href="#" class="table-button sort">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button filter">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button actions">Actions <span class="table-button-icon"></span></a> */}
          <div class="styled">
        <select>
                <option selected>Sort</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>

        <div class="styled">
        <select>
                <option selected>Filter</option>
                <option>Apples</option>
                <option>Chocklate</option>
                <option>Pancakes</option>
            </select>
        </div>


        <div class="styled">
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
                                      <th className="app-table2-header">Merchant</th>
                                      <th className="app-table2-header">API</th>
                                    <th className="app-table2-header">Status</th>
                                    <th className="app-table2-header">Date</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr className="app-table2-row">
                                          <td className="app-table2-data"><input type = "checkbox" /></td>
                                  <td className="app-table2-data">PD-8U78</td>
                                      <td className="app-table2-data">Lorem Ipsum</td>
                                      <td className="app-table2-data">Transfer</td>
                                      <td className="app-table2-data" style={{color: '#7fe233'}}>Approved</td>
                                      <td className="app-table2-data">12/08/20</td>
                                  </tr>
                                  </tbody>
                                  
                                  
                                  </table>
      </div>
    </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

function Services() {

        return(
        <>
            <div class="content-header">Incoming Socket API</div>
      <div class="content-sub">Here are the list onf incoming socket API</div>
      <div class="app-table-actions">
      <div class="app-table-search">
        <input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name" />
          </div>
        <div class="app-table-buttons">
          <a href="#" class="table-button filter">Add API<span class="table-button-icon"></span></a>
        </div>
      </div>

      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                      <th className="app-table2-header">API</th>
                                      <th className="app-table2-header">Category</th>
                                      <th className="app-table2-header">Usage</th>
                                      <th className="app-table2-header"></th>
                                      <th className="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr className="app-table2-row">
                                  <td className="app-table2-data">Transfer</td>
                                      <td className="app-table2-data">Transfer</td>
                                      <td className="app-table2-data" style={{color: '#7fe233'}}>10</td>
                                      <td className="app-table2-data"><span className="app-icon" style={{ color: '#F95050', fontSize: '20px'}}></span></td>
                                      <td className="app-table2-data" style={{color: '#131573', fontWeight: 'bold', cursor: 'pointer'}}><Link style={{ textDecoration: 'none'}} to="/api-service/"><div>Manage API <span className="app-icon"></span></div></Link></td>
                                  </tr>
                                 
                                 
                                  </tbody>
                                  
                                  
                                  </table>
</>
    )
}

export default Services;
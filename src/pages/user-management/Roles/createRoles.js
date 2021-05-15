
import React from 'react'
import Leftbar from '../../../components/leftbar/leftbar'
import Rightbar from '../../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'

function ApiService() {

        return(
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
        <Link style={{ textDecoration: 'none'}} to="/user-management"><div className="settings-icon"></div></Link> 
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="content-header">Create Role</div>
          <div class="content-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
        </div>
        <div class="app-table-buttons">
          <a href="/" class="table-button filter">Reset API<span class="table-button-icon"></span></a>
          <a href="/" class="table-button actions">Save Changes<span class="table-button-icon"></span></a>
        </div>
      </div>

      <div class="basic-table-card">
        <div class="content-header-2">Details</div>
        <div class="content-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, </div>
        <div class="role-descrip-div">
          <div class="role-descrip-div-col-1">
            <div class="form-block-2 w-form">
              <form id="email-form" name="email-form" data-name="Email Form">
                  <input type="text" class="app-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Provider" id="name"/></form>
            </div>
          </div>
          <div class="role-descrip-div-col-2">
            <div class="form-block-2 w-form">
              <form id="email-form" name="email-form" data-name="Email Form">
                  <input type="text" class="app-text-field w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="Commision" id="name-2"/></form>
            </div>
          </div>
        </div>
      </div>

      <div className="basic-table-card">
                <div className="table-header">
                  <div className="content-header-2">API Usage</div>
                </div>
                
                <table className="app-table">
										<thead>
											<tr className="app-table-row">
											<th className="app-table-header">Paysure Product</th>
											<th className="app-table-header">Details</th>
											<th className="app-table-header">Transactions</th>
											<th className="app-table-header">Error Logs</th>
										</tr>
										</thead>

										<tbody>
											<tr className="app-table-row">
											<td className="app-table-data">Agency</td>
											<td className="app-table-data">Lorem Ipsum eruex polo</td>
											<td className="app-table-data">1000</td>
                                            <td className="app-table-data">200</td>
										</tr>

										</tbody>
										
										
										</table>
              </div>
     </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )

}

export default ApiService ;
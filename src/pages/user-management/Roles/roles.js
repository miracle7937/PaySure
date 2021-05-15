
import React from 'react'
import { Link } from 'react-router-dom'
import EmptyData from '../../../components/ui/emptyData/emptyData'

function Roles({roles,searchArray}) {

        return(
            <>
<div className="content-header">Manage Roles</div>
      <div className="content-sub">Here are the list of roles available</div>
      <div className="app-table-actions">
      <div className="app-table-search">
        <input onChange={searchArray} type="text" className="app-input-search w-input"  placeholder="Search..." />
          </div>
        {/* <div className="app-table-buttons">
          <Link to="/create-role/4" className="table-button filter">Add Role<span className="table-button-icon"></span></Link>
        </div> */}
      </div>
      {
                        roles.length <= 0 ? <EmptyData/> :
      <table className="app-table2">
                                  <thead>
                                      <tr className="app-table2-row">
                                      <th className="app-table2-header">Role</th>
                                      <th className="app-table2-header">Description</th>
                                      <th className="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      roles.map(result => {
                                        return(
                                            <tr key={result.id} className="app-table2-row">
                                  <td className="app-table2-data">{result.roleName}</td>
                                      <td className="app-table2-data">{result.roleDescription}</td>
                                      <td className="app-table2-data" style={{ fontWeight: 'bold', cursor: 'pointer'}}>
                                        <Link style={{ textDecoration: 'none', color: '#131573',}} to={"/edit-role/" + result.roleName}><div>Manage Role <span className="app-icon"></span></div></Link>
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

export default Roles ;
import React, { useState, useEffect }  from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import { Link } from 'react-router-dom'
import { getOrganisations, getRoles, getBands} from '../../globalApi'
import defaultLogo from './d-logo.png'
import { Redirect } from 'react-router-dom'
import OrgForm from './addOrganisation'
import EmptyData from '../../components/ui/emptyData/emptyData'
function Organisations() {
  
    const [organisations, setOrg] = useState([])
    const [ addOrg, setaddOrg] = useState(false)
    const [adminRoles, setAdminRoles] = useState([]);
    const [bands, setBands] = useState([]);
    
  
    useEffect( () => {
      getOrganisations().then(result =>{setOrg(result)} )
      getRoles().then(result => { setAdminRoles(result)})
      getBands().then(result => { setBands(result)})
    },[])

    const toggleaddOrg = () => {
        addOrg ? setaddOrg(false) :  setaddOrg(true)
      }

      const updateOrgList = (newOrg) => {
        setOrg([...organisations, newOrg])
        }

        const searchArray = (e) => {
            getOrganisations().then(result =>{
                const test = result.filter(result => {
                return result.organisationName.toLowerCase().includes(e.target.value.toLowerCase());
              });
              setOrg(test);
            
            } )
              
        }



    if (!localStorage.getItem("token")) {
        return <Redirect to="/" />;
      }

    return (
        <div className="app-admin-section">
            {
                     addOrg ? <OrgForm roles= {adminRoles} bands={bands} updateOrgList = {updateOrgList} closeModal = {toggleaddOrg}/> : null
            }
            <div className="app-admin-col-1">
                <Leftbar />
            </div>
            <div className="app-admin-col-2">
                <div className="admin-top-bar">
                    <div className="admin-top-bar-left">
                        <div className="settings-icon"></div>
                    </div>
                    <div className="admin-top-bar-right">
                        <div className="admin-topbar-date">October 8th, 2020</div>
                    </div>
                </div>

                <div className="content-header">Organisations</div>
                <div className="content-sub">Here are the list of organisations</div>
                <div className="app-table-actions">
                    <div className="app-table-search">
                        <input onChange={searchArray} type="text" className="app-input-search w-input" placeholder="Search..." id="name" />
                    </div>
                    <div className="app-table-buttons">
                        <div style={{cursor:'pointer'}} onClick={ toggleaddOrg } className="table-button filter">Add New Organisation<span className="table-button-icon"></span></div>
                    </div>
                </div>
                {
                        organisations.length <= 0 ? <EmptyData/> :
                <table className="app-table2">
                    <thead>
                        <tr className="app-table2-row">
                        <th className="app-table2-header">Org.Logo</th>
                            <th className="app-table2-header">Org.Code</th>
                            <th className="app-table2-header">Org.Name</th>
                            <th className="app-table2-header">Email Address</th>
                            <th className="app-table2-header">Phone Number</th>
                            <th className="app-table2-header"></th>
                        </tr>
                    </thead>
            
                        <tbody>
                        {
                            organisations.map( org => {
                                return (
                                        <tr key={ org.id } className="app-table2-row">
                             { org.logoUrl !== null && org.logoUrl.includes("https") ? 
                             <td className="app-table2-data"><img width="50" src={ org.logoUrl } alt="logo"/></td>
                             :
                             <td className="app-table2-data"><img width="50" src={ defaultLogo} alt="default"/></td>
                             }               
                            
                            <td className="app-table2-data">{org.organisationCode}</td>
                            <td className="app-table2-data">{org.organisationName}</td>
                            <td className="app-table2-data">{org.contactEmailAddress}</td>
                            <td className="app-table2-data">{org.contactPhoneNumber}</td>
                            <td className="app-table2-data" style={{ color: '#131573', fontWeight: 'bold', cursor: 'pointer' }}>
                                <Link style={{ textDecoration: 'none' }} to= {'/organisation/' + org.organisationCode}><div>View Organisation <span className="app-icon"></span></div></Link></td>
                        </tr>
                                )
                            })
                        }
                    
                    </tbody>
          
                </table>

                    }
            </div>
            <div className="app-admin-col-3">
                <Rightbar />
            </div>
        </div>
    )

}

export default Organisations;
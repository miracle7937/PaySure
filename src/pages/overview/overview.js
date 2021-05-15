import React, { useState, useEffect }  from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import '../global.css'
import { Link, Redirect } from 'react-router-dom'
import { currentUser, getOrganisations, getUsers, getServiceProviders, getServices, getTransactions } from '../../globalApi'
import { Line, Doughnut } from 'react-chartjs-2';


export default function Overview(props) {

  const [user, setUser] = useState({})
  const [organisations, setOrg] = useState(0)
  const [users, setUsers] = useState([])
  const [usersLength, setUsersLength] = useState('')
  const [serviceP, setServiceP] = useState('')
  const [services, setServices] = useState('')
  const [trans, setTrans] = useState('')

  useEffect( () => {
    const getUser = currentUser()
    setUser(getUser)
    getOrganisations().then(result => setOrg(result.length))
    getUsers().then(result => setUsers(result))
    getUsers().then(result => setUsersLength(result.length))
    getServiceProviders().then(result => setServiceP(result.length))
    getServices().then(result => setServices(result.length))
    getTransactions().then(result => setTrans(result.length))
  }, [])

  const data = {
    labels: ['2018','2019','2020','2021'],
    datasets: [
      {
        label: false,
        data: [0,65, 81, 56],
        fill: false,
        borderColor: 'rgb(83,34,219)',
        borderWidth: 1.5,
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  const data2 = {
    labels: false,
    datasets: [
      {
        label: '# of Votes',
        data: [80,20],
        backgroundColor: [
          '#5322DB',
          '#DAE1F2',
        ],
        borderColor: ["#F6F8F9"],
      },
    ],
  };


  if (!localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
        return(
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
          {/* <div className="settings-icon"></div> */}
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
            <div className="content-header">Hii there! <span style={{textTransform: 'capitalize'}}>{user.username}</span></div>
              <div className="content-sub2"> Here are the latest report on Paysure Digital</div>
              <div data-animation="slide" data-duration="500" data-infinite="1" className="content-slider w-slider">
                <div className="mask w-slider-mask">
                <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Wallet</div>
                          <div className="slide-card-value">N23,000,000</div>
                        </div>
                        <div className="slide-card-icon green"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Users</div>
                          <div className="slide-card-value">{ usersLength }</div>
                        </div>
                        <div className="slide-card-icon purple"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Products</div>
                          <div className="slide-card-value">5</div>
                        </div>
                        <div className="slide-card-icon orange"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Organisation</div>
                          <div className="slide-card-value">{ organisations }</div>
                        </div>
                        <div className="slide-card-icon blue"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Service Providers</div>
                          <div className="slide-card-value">{ serviceP }</div>
                        </div>
                        <div className="slide-card-icon yellow"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Services</div>
                          <div className="slide-card-value">{services}</div>
                        </div>
                        <div className="slide-card-icon red"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-slider-left-arrow w-slider-arrow-left">
                  <div className="w-icon-slider-left"></div>
                </div>
                <div className="content-slider-right-arrow w-slider-arrow-right">
                  <div className="w-icon-slider-right"></div>
                </div>
                <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
              </div>
              <div className="basic-table-card">
                <div className="content-header-2">Business Revenue</div>
                <div className="analytics-div">
                  <div className="analytics-graph">
                  <Line height= "200" data={data} options={options} />
                  </div>
                  <div className="analytics-graph-2">
                    <div className="content-header-3">Monthly Target</div>
                    <div className="content-sub-2">Average Total Sales</div>
                    <div className="content-graph">
                                         <div className="doughnut-div">
                   <Doughnut data={data2} />
                   </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="basic-table-card">
                <div className="table-header">
                  <div className="content-header-2">Users</div>
                 <Link to="/user-management"><div className="table-view-all">View all</div></Link> 
                </div>
                
                <table className="app-table">
										<thead>
											<tr className="app-table-row">
                      <th className="app-table-header">Username</th>
											<th className="app-table-header">Email Address</th>
                      <th className="app-table-header">Phone Number</th>
											<th className="app-table-header">Roles</th>
                      <th className="app-table-header">Last seen</th>
                      <th className="app-table-header">Status</th>
										</tr>
										</thead>

										<tbody>
                      { users.map((user) => {

                   return (<tr key={user.id} className="app-table-row">
                      <td style={{textTransform: 'capitalize'}} className="app-table-data">{user.username}</td>
                     <td className="app-table-data">{user.emailAddress}</td>
                     <td className="app-table-data">{user.phoneNumber}</td>
                     <td className="app-table-data">Super Admin</td>
                     <td className="app-table-data">{user.lastLoginDate}</td>
                     { user.active == 1 ? 
                      <td className="app-table-data table-active">Active</td> 
                    : 
                    <td className="app-table-data table-inactive">Inactive</td>
                    }
                     
                   </tr>)	

                      })}
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

import React, { useState, useEffect }  from 'react'
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import '../global.css'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { currentUser, getOrganisations, getUsers, getServiceProviders, getServices, getTransactions,getPaysureBalance } from '../../globalApi'
import { Line, Doughnut } from 'react-chartjs-2';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NumberFormat from 'react-number-format';

export default function Overview(props) {

  const [user, setUser] = useState({})
  const [organisations, setOrg] = useState(0)
  const [users, setUsers] = useState([])
  const [usersLength, setUsersLength] = useState('')
  const [serviceP, setServiceP] = useState('')
  const [services, setServices] = useState('')
  const [trans, setTrans] = useState('')
  const [paysureBalance, setPaysureBalance] = useState({})

  const history = useHistory();

  useEffect( () => {
    const getUser = currentUser()
    setUser(getUser)
    getPaysureBalance(history).then(result => {console.log(result);setPaysureBalance(result)})
    getOrganisations(history).then(result => setOrg(result.length))
    getUsers(history).then(result => setUsers(result))
    getUsers(history).then(result => setUsersLength(result.length))
    getServiceProviders(history).then(result => setServiceP(result.length))
    getServices(history).then(result => setServices(result.totalRecords))
    getTransactions(history).then(result => setTrans(result.length))    
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
              <br/><br/>
              <OwlCarousel className='owl-theme' loop margin={10} nav>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Wallet</div>
                          <NumberFormat value={paysureBalance.walletBalance} className="slide-card-value" displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                        </div>
                        <div className="slide-card-icon green"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Commission</div>
                          <NumberFormat value={paysureBalance.commissionBalance} className="slide-card-value" displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value, props) => <div {...props}>{value}</div>} />
                        </div>
                        <div className="slide-card-icon green"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Products</div>
                          <div className="slide-card-value">5</div>
                        </div>
                        <div className="slide-card-icon orange"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Organisation</div>
                          <div className="slide-card-value">{ organisations }</div>
                        </div>
                        <div className="slide-card-icon blue"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Service Providers</div>
                          <div className="slide-card-value">{ serviceP }</div>
                        </div>
                        <div className="slide-card-icon yellow"></div>
                      </div>
                    </div>
    </div>
    <div className='item'>
    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Services</div>
                          <div className="slide-card-value">{services}</div>
                        </div>
                        <div className="slide-card-icon red"></div>
                      </div>
                    </div>
    </div>
</OwlCarousel>
<br/><br/>
              <div className="basic-table-card">
                <div className="app-table-actions">
                    <div className="app-table-search">
                    <div className="content-header-2">Business Revenue Stats</div>
                    <div className="content-header-4">Monthly Stats</div>
                    </div>
                    <div className="app-table-buttons">
                    <input type="month" id="start"/>
                    </div>
                </div>
                <br/>
                <div className="details-flex">
          <div className="details-div-x">
          <div className="details-header">Total Transaction</div>
          <div className="details-value">N12,000,000</div>
          </div>
          <div className="details-div-x">
            <div className="details-header">Total Settlements</div>
            <div className="details-value">N20,000,000</div>
          </div>
          <div className="details-div-x">
            <div className="details-header">Income</div>
            <div className="details-value">N60,000</div>
          </div> 
          </div>
                <div className="analytics-div">
                  <div className="analytics-graph">
                  <Line height= "200" data={data} options={options} />
                  </div>
                  <div className="analytics-graph-2">
                    <div className="content-header-3">Monthly Revenue</div>
                    <div className="content-amount">N200,000.00</div>
                    <div className="content-graph">
                                         <div className="doughnut-div">
                   <Doughnut data={data2} />
                   </div>
                    </div>

                  </div>
                </div>
                <br/><br/><br/><br/>
                <div className="app-table-actions">
                    <div className="app-table-search">
                    <div className="content-header-4">Daily Stats</div>
                    </div>
                    <div className="app-table-buttons">
                    <input type="date" id="start"/>
                    </div>
                </div>
                <br/><br/>
                <div className="details-flex">
          <div className="details-div">
          <div className="details-header">Transaction Count</div>
          <div className="details-value">240</div>
          </div>
          <div className="details-div">
            <div className="details-header">Success Transaction Count</div>
            <div className="details-value">70</div>
          </div>
          <div className="details-div">
            <div className="details-header">Failed Transaction Count</div>
            <div className="details-value">55</div>
          </div> 
          <div className="details-div">
            <div className="details-header">Transaction Amount</div>
            <div className="details-value">N2,000,000</div>
          </div>
          <div className="details-div">
            <div className="details-header">Total Settlements</div>
            <div className="details-value">N2,000,000</div>
          </div>
          <div className="details-div">
            <div className="details-header">Income</div>
            <div className="details-value">N100,000</div>
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

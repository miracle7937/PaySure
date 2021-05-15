import React, { useState, useEffect }  from 'react'
import Leftbar from '../../../../components/leftbar/leftbar'
import Rightbar from '../../../../components/rightbar/rightbar'
import Overview from './overview'
import Users from './users'
import Transactions from './transactions'
import { Redirect, useParams } from 'react-router-dom'
import { getMerchants, getUsers2, getMerTransaction } from '../../../../globalApi'
export default function Product() {
        
    const [ backRoute, setBackRoute] = useState(false);
    const [ overview, setOverview] = useState(true);
    const [ users, setUsers] = useState(false);
    const [ transactions, setTransactions] = useState(false);
    const [merchants, setMerchants] = useState([])
    const [admin, setAdmin] = useState([]);
    const [trans, setTrans] = useState([]);
    let { id } = useParams();
    const orgCode = localStorage.getItem('orgCode');
   
  useEffect( () => {

    const findMerch = async () => {
       await merchants.find( code => {
        return code.merchantCode == id;
      })
    }
    const final = findMerch().then(result => {return result})
    getMerchants(orgCode).then(result => { setMerchants(result); console.log('merch>>>>>>>>>>>>>>>>>>', result) }).then(    
    console.log('merch>>>>>>>>>333333>>>>>>>>>',merchants)
    )
    console.log(id)

    getUsers2(id).then(result => { setAdmin(result)})
    getMerTransaction(id).then(result => { setTrans(result)})
  }, [])


  const toBack = () => {
    setBackRoute(true)
  }

    const changeOverview = () => {
      setOverview(true)
      setUsers(false)
      setTransactions(false)

    }

    const changeUsers = () => {
      setOverview(false)
      setUsers(true)
      setTransactions(false)

    }

    const changeTransactions = () => {
      setOverview(false)
      setUsers(false)
      setTransactions(true)
    }


    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }

    if(backRoute){
      return <Redirect to = { "/organisation/" + orgCode} />;
    }

        return(
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
        <div onClick={ toBack } className="settings-icon"></div> 
          <div onClick = { changeOverview }  className={overview ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Overview</div>
          <div onClick = { changeUsers }  className={users ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Users</div>
          <div onClick = { changeTransactions }  className={transactions ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Transactions</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      { overview ? <Overview /> 
      : users ? <Users admin = { admin } />
      : transactions ? <Transactions trans = {trans} />
      : <Overview /> }

    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )
}

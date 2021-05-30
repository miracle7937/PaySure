
import React, { useState, useEffect } from 'react'
import Leftbar from '../../../components/leftbar/leftbar'
import Rightbar from '../../../components/rightbar/rightbar'
import { Link, useParams } from 'react-router-dom'
import Overview from './overview'
import Transactions from './transactions'
import Charges from './charges'
import Settlements from './settlements'
import { getServiceProvider, getCharges,getServices,getTransactionsProvider,getWalletBalance } from '../../../globalApi'

export default function Provider() {
        
    const [ overview, setOverview] = useState(false);
    const [ settlement, setSettlement] = useState(false);
    const [ transactions, setTransactions] = useState(false);
    const [ charges, setChargesView] = useState(false);
    const [provider, setProvider] = useState({})
    const [chargesData, setChargesData] = useState([])
    const [transData, setTransData] = useState([])
    const [services, setServices] = useState([]);
    const[wallet, setWallet] = useState({})
    const [newpage, setNewPage] = useState(0)
    const [newrecord, setNewRecord] = useState(10)
    let defaultPage = localStorage.getItem('tcP')
    let defaultRecords = localStorage.getItem('tR')
    let {id} = useParams();

    useEffect( async () => {
     console.log(id)
     getServices().then(result => setServices(result));
     await getServiceProvider(id).then(result => {
     setProvider(result); 
     getCharges(result.id).then(result => {setChargesData(result)} )} )

     getTransactionsProvider().then(result => { setTransData(result)});

        getWalletBalance(id).then(result => setWallet(result));  
      },[])


    const changeOverview = () => {
      setOverview(true)
      setSettlement(false)
      setTransactions(false)
      setChargesView(false);  
    }

    const changeSettlement = () => {
      setOverview(false)
      setSettlement(true)
      setTransactions(false)
      setChargesView(false);
    
    }

    const changeTransactions = () => {
      setOverview(false)
      setSettlement(false)
      setTransactions(true)
      setChargesView(false);
    
    }

    const changeCharges = () => {
      setOverview(false)
      setSettlement(false)
      setTransactions(false)
      setChargesView(true);
    
    }


        return(
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <div className="admin-top-bar">
        <div className="admin-top-bar-left">
         <Link style={{ textDecoration: 'none'}} to="/service-providers"><div className="settings-icon"></div></Link> 
          <div onClick = { changeOverview } className={overview ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Overview</div>
          {/* <div onClick = { changeTransactions } className={transactions ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Transactions</div> */}
          <div onClick = { changeSettlement } className={settlement ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Settlements</div>
          <div onClick = { changeCharges } className={charges ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Charges</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      { overview ? <Overview wallet={wallet} provider= {provider} services={services}/> 
      : settlement ? <Settlements provider= {provider}/>
      : transactions ? <Transactions transData={transData} provider= {provider}/>
      : charges ? <Charges chargesData={chargesData} provider= {provider}/>
      : <Overview wallet={wallet} provider= {provider} services={services}/> }


    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )
}

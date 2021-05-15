
import React, { useState, useEffect } from 'react'
import Leftbar from '../../../components/leftbar/leftbar'
import Rightbar from '../../../components/rightbar/rightbar'
import { Link, useParams } from 'react-router-dom'
import Overview from './overview'
import Transactions from './transactions'
import Charges from './charges'
import Settlements from './settlements'
import { getServiceProvider, getCharges,getServices,getTransactions } from '../../../globalApi'

export default function Provider() {
        
    const [ overview, setOverview] = useState(false);
    const [ settlement, setSettlement] = useState(false);
    const [ transactions, setTransactions] = useState(false);
    const [ charges, setChargesView] = useState(false);
    const [provider, setProvider] = useState({})
    const [chargesData, setChargesData] = useState([])
    const [transData, setTransData] = useState([])
    const [services, setServices] = useState([]);
    let {id} = useParams();

    useEffect( async () => {
     console.log(id)
     getServices().then(result => setServices(result));
     await getServiceProvider(id).then(result => {
     setProvider(result); 
     getCharges(result.id).then(result => {setChargesData(result)} )} )

        getTransactions().then(result => { 
          let data = result.filter(trans => { 
           return trans.providerName = provider.providerName
          });
          console.log('trans>>>', data);
          console.log('transAll>>>', result);
          console.log('prov>>>', provider);
        setTransData(data)});

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
          <div onClick = { changeOverview } className="admin-top-barlinks admin-active-top-link">Overview</div>
          <div onClick = { changeTransactions } className="admin-top-barlinks">Transactions</div>
          <div onClick = { changeSettlement } className="admin-top-barlinks">Settlements</div>
          <div onClick = { changeCharges } className="admin-top-barlinks">Charges</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      { overview ? <Overview provider= {provider} services={services}/> 
      : settlement ? <Settlements provider= {provider}/>
      : transactions ? <Transactions transData={transData} provider= {provider}/>
      : charges ? <Charges chargesData={chargesData} provider= {provider}/>
      : <Overview provider= {provider} services={services}/> }


    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )
}

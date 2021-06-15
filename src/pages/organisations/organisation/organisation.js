import React, { useState, useEffect }  from 'react'
import Leftbar from '../../../components/leftbar/leftbar'
import Rightbar from '../../../components/rightbar/rightbar'
import Overview from './overview'
import Merchants from './merchants'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getOrganisation, getMerchantsB2B,getMerchantsB2BCustom, getBands, getRoles } from '../../../globalApi'
export default function Product() {
        
    const [ overview, setOverview] = useState(true);
    const [ users, setUsers] = useState(false);
    const [organisation, setOrg] = useState({})
    const [adminRoles, setAdminRoles] = useState([]);
    const [merchants, setMerchants] = useState([])
    const [merchantsCustom, setMerchantsCustom] = useState([])
    const [bands, setBands] = useState([]);
    const [b2b, setB2b] =useState(false)
    const [b2bCustom, setB2bCustom] =useState(false)
    const[allMerchant, setAllMerchant] =useState([])
    let { id } = useParams();


  useEffect( () => {
    getRoles().then(result => { setAdminRoles(result)})
    getOrganisation(id).then(result => setOrg(result))
    getMerchantsB2B(id).then(result => {setMerchants(result); setB2b(true)})
    getMerchantsB2BCustom(id).then(result => setMerchantsCustom(result))
    getBands().then(result => { setBands(result)})
  }, [])


  useEffect(() => {
    function allMerchant(){
      const allMerc = [...merchants,...merchantsCustom]
      console.log("allll>>>>>",allMerc)
      setAllMerchant(allMerc)
    }
  allMerchant()
  }, [b2b])



  const updateList = (newMer) => {
    setMerchants([...merchants, newMer])
    }

    const changeOverview = () => {
      setOverview(true)
      setUsers(false)
    }

    const changeUsers = () => {
      setOverview(false)
      setUsers(true)
    }



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
        <Link style={{ textDecoration: 'none'}} to="/organisations"><div className="settings-icon"></div></Link> 
          <div onClick = { changeOverview }  className={overview ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Overview</div>
          <div onClick = { changeUsers }  className={users ? 'admin-top-barlinks admin-active-top-link' : 'admin-top-barlinks'}>Merchants</div>
        </div>
        <div className="admin-top-bar-right">
          <div className="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>

      { overview ? <Overview organisation ={organisation}/> 
      : users ? <Merchants roles= {adminRoles} bands={bands} organisation ={organisation} allMerchant = {allMerchant} updateList={updateList} />
      : <Overview organisation ={organisation}/> }

    </div>
      <div className="app-admin-col-3">
              <Rightbar />
            </div>
</div>
    )
}

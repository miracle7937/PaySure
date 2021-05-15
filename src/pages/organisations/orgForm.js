import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../baseUrl.json'
import Loader from '../../components/ui/loader/loader'
import State from '../../components/ui/state/state'
import State2 from '../../components/ui/state/state2'
import AddOrg from './addOrganisation'
import AddMer from './organisation/addMerchant'
export default function OrgForm(props) {
    
    const [loader, setLoader] = useState(true)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')
    const [orgState, setOrgState] = useState(true)
    const [orgCode, setorgCode] = useState('')
   


    const CreateOrg = async(orgData, e) => {
        e.preventDefault();
        console.log('orgClick')
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/organisations', orgData, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
          props.updateOrgList(user.data.data);
          setorgCode(user.data.data.organisationCode)
          console.log(user.data.data.organisationCode)

          setLoader(false);
          setFormState(true);
          setFormStateType('success')
          setOrgState(false)
          }
          else {
  
            setLoader(false);
          setFormState(true);
          setFormStateType('failed')
          setOrgState(true)
          }
         }
         catch(e){console.log(e)}
    }


    const CreateMer = async(merData, modalArray, e) => {
        e.preventDefault();
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/b2b/register',
             {
                ...merData,
                organisationCode: orgCode,
                ipAddresses: modalArray

            }, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
          setLoader(false);
          setFormState(true);
          setFormStateType('success')
          props.closeModal()
          }
          else {
            setLoader(false);
          setFormState(true);
          setFormStateType('failed')
          }
         }
         catch(e){console.log(e)}
    }

    const resetState = () => {
        setFormState(false)
    }
    return(
        <>
                
          { loader? <Loader/> : null } 
          {/* {formState ? <State closeModal={resetState} state = {formStateType} /> : null }  */}
          {formState2 ? <State2 closeModal={resetState} state = {formStateType2} /> : null } 
            {
        orgState ? <AddOrg closeModal={props.closeModal} submitForm = {CreateOrg}/>  :  <AddMer bands={props.bands} roles={props.adminRoles} closeModal={props.closeModal} submitForm = {CreateMer}/>
            }   

        </>
    )
}
import React, { useState }  from 'react'
import axios from 'axios'
import url from '../../../baseUrl.json'
import Loader from '../../../components/ui/loader/loader'
import State from '../../../components/ui/state/state'
import { useParams} from 'react-router-dom'
export default function AddPermission(props) {
    
    const bandForm = {
         bandName: "",
        bandDescription: "",
        dailyCumulativeLimit: 0,
        airtimeLimit: 0,
        transferLimit: 0,
        withdrawalLimit: 0
    }
    const [modalArray, setModalArray] = useState([])
    const [ bandData, setBandData] = useState(bandForm)
    const [loader, setLoader] = useState(false)
    const [formState, setFormState] = useState(false)
    const [formStateType, setFormStateType] = useState('success')

    let { id } = useParams();

   const addtoArray = (result) => {
       console.log('clicked')
       setModalArray([...modalArray, result])
   }

   const removePerm = (index) => {
       console.log('index', index)
    modalArray.splice(index, 1);
    setModalArray([...modalArray]) 
    console.log(modalArray)
    
  };
  const permData = {
    "roles": [id],
    "permissions": modalArray
  }

    const addPermission = async(e) => {
        e.preventDefault();
        console.log('araaaa', permData)
        setLoader(true)
        const local_token = localStorage.getItem('token');
        try {
            const user = await axios.post(url.url + '/roles/addpermissions',{
                "roles": [id],
                "permissions": modalArray
            }, {
                headers: {
                    'Authorization': `Bearer ${local_token}` 
                  }
            })
          if(user.data.responseCode === 0) {
            props.updatePermissionList(modalArray);
          setLoader(false);
          setFormState(true);
          setFormStateType('success')
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
      props.closeModal()
    }
    return(
        <>
        {
            formState ? <State closeModal={resetState} state = {formStateType} /> :
              <div className="app-modal-overlay">
      <div className="app-modal-div">
          { loader? <Loader/> : null }
      <div className="app-modal-heading">
        <div className="app-modal-header">Add Permission</div>
      </div>
      <div className="w-form">
          <form onSubmit={ addPermission }>
          <select style={{ marginBottom: '30px'}} onChange={ (e) => addtoArray(e.target.value)}  className="app-select w-select">
              {
                  props.permissions.map(result => {
                      return <option key={result.id} value={ result.permissionName }>{result.permissionDescription}</option>
                  })
              }
        
            </select>
            {
                  modalArray.map((result, index) => {
                    return(
                      <div key={result} style={{marginRight:'20px',marginBottom:'20px', background: '#ededed', padding:'10px', borderRadius:'5px', display:'inline-block', color: '#696969', fontSize: '13px'}}>
                 {result} <span onClick={()=>{ removePerm(index)}} style={{ cursor: 'pointer', fontWeight: 'bold', color:'red', marginLeft:'10px'}}>X</span>
               </div>
                    )
                  })
                }
          <button type="submit" style={{marginTop:'20px',display:'block', cursor:'pointer'}} className="app-modal-button">Add Permission</button>
        </form>
      </div>
      <div onClick= {props.closeModal} className="app-modal-close"></div>
    </div>
  </div>
        }
      
        </>
    )
}
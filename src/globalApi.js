import axiosInstance from "./helpers/axios";
import axios from "axios";
import url from './baseUrl.json'

export function Logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function currentUser()  {
    const local_user = localStorage.getItem('user');
    return JSON.parse(local_user);
}


export async function getWalletBalance(walletId) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/transactions/merchant/balance/' + walletId, {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log('result>>>>>',result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}

export async function getPaysureBalance(history) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance(history).get(process.env.REACT_APP_BACKEND_URL + '/transactions/gateway/balance', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log('result>>>>>',result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}


export async function getOrganisations(history) {
    const local_token = localStorage.getItem('token');
    try {
        const result = await axiosInstance(history).get(process.env.REACT_APP_BACKEND_URL + '/organisations/parent/' + url.org_code, {
          headers: {
            'Authorization': `Bearer ${local_token}` 
          }
        })
      if(result.data.responseCode === 0) {
        return result.data.data
      }
      else {
        console.log('result>>>>>',result.data.responseMessage)
      }
     }
     catch(e){console.log(e)}
      
}

export async function getOrganisation(orgCode) {
    const local_token = localStorage.getItem('token');
    try {
        const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/organisations/' + orgCode, {
          headers: {
            'Authorization': `Bearer ${local_token}` 
          }
        })
      if(result.data.responseCode === 0) {
        return result.data.data
      }
      else {
        console.log(result.data.responseMessage)
      }
     }
     catch(e){console.log(e)}
      
}

export async function getServiceProviders(history) {
    const local_token = localStorage.getItem('token');
  try {
    const result = await axiosInstance(history).get(process.env.REACT_APP_BACKEND_URL + '/services/providers' , {
      headers: {
        'Authorization': `Bearer ${local_token}` 
      }
    })
  if(result.data.responseCode === 0) {
    return result.data.data
  }
  else {
    console.log(result.data.responseMessage)
  }
 }
 catch(e){console.log(e)}

}

export async function getServiceProvider(provCode) {
  const local_token = localStorage.getItem('token');
try {
  const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/services/providers/' + provCode , {
    headers: {
      'Authorization': `Bearer ${local_token}` 
    }
  })
if(result.data.responseCode === 0) {
  return result.data.data
}
else {
  console.log(result.data.responseMessage)
}
}
catch(e){console.log(e)}

}


export async function getCharges(provId) {
  const local_token = localStorage.getItem('token');
try {
  const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/services/charges/' + provId , {
    headers: {
      'Authorization': `Bearer ${local_token}` 
    }
  })
if(result.data.responseCode === 0) {
  return result.data.data
}
else {
  console.log(result.data.responseMessage)
}
}
catch(e){console.log(e)}

}

export async function getServices(history) {
    const local_token = localStorage.getItem('token');
  try {
    const result = await axiosInstance(history).get(process.env.REACT_APP_BACKEND_URL + '/services?orderBy=serviceName&pageNumber=1&recordsPerPage=10' , {
      headers: {
        'Authorization': `Bearer ${local_token}` 
      }
    })
  if(result.data.responseCode === 0) {
    return result.data
  }
  else {
    console.log(result.data.responseMessage)
  }
 }
 catch(e){console.log(e)}

}

export async function getServicesAll(page,records) {
  const local_token = localStorage.getItem('token');
try {
  const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + `/services?orderBy=serviceName&pageNumber=${page}&recordsPerPage=${records}` , {
    headers: {
      'Authorization': `Bearer ${local_token}` 
    }
  })
if(result.data.responseCode === 0) {
  localStorage.setItem('ser-tcP', page)
  localStorage.setItem('ser-tR', records)
  return result.data
}
else {
  console.log(result.data.responseMessage)
}
}
catch(e){console.log(e)}

}

export async function getTransactions(history) {
    const local_token = localStorage.getItem('token');
  try {
    const result = await axiosInstance(history).get(process.env.REACT_APP_BACKEND_URL + '/transactions?orderBy=serviceName&pageNumber=1&recordsPerPage=10' , {
      headers: {
        'Authorization': `Bearer ${local_token}` 
      }
    })
  if(result.data.responseCode === 0) {
    return result.data.data
  }
  else {
    console.log(result.data.responseMessage)
  }
 }
 catch(e){console.log(e)}

}

export async function getTransactionsAll(page,records) {
  const local_token = localStorage.getItem('token');
try {
  const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + `/transactions?orderBy=serviceName&pageNumber=${page}&recordsPerPage=${records}` , {
    headers: {
      'Authorization': `Bearer ${local_token}` 
    }
  })
if(result.data.responseCode === 0) {
  localStorage.setItem('tcP', page)
  localStorage.setItem('tR', records)
  return result.data
}
else {
  console.log(result.data.responseMessage)
}
}
catch(e){console.log(e)}

}

export async function getTransactionsProvider(page,records,providerName) {
  const local_token = localStorage.getItem('token');
try {
  const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + `/transactions?orderBy=serviceName&pageNumber=1&recordsPerPage=10` , {
    headers: {
      'Authorization': `Bearer ${local_token}` 
    }
  })
if(result.data.responseCode === 0) {
  localStorage.setItem('prov-tcP', page)
  localStorage.setItem('prov-tR', records)

  let provData = await result.data.data.filter(trans => { 
    return trans.providerName == providerName
   });
   console.log('provider', providerName)
  return provData
}
else {
  console.log(result.data.responseMessage)
}
}
catch(e){console.log(e)}

}

export async function getUsers(history) {
        const local_token = localStorage.getItem('token');
      try {
        const result = await axiosInstance(history).get(process.env.REACT_APP_BACKEND_URL + '/organisations/users/' + url.org_code , {
          headers: {
            'Authorization': `Bearer ${local_token}` 
          }
        })
      if(result.data.responseCode === 0) {
        return result.data.data
      }
      else {
        console.log(result.data.responseMessage)
      }
     }
     catch(e){console.log(e)}

}

export async function getUsers2(merCode) {
  const local_token = localStorage.getItem('token');
try {
  const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/merchants/users/' + merCode , {
    headers: {
      'Authorization': `Bearer ${local_token}` 
    }
  })
if(result.data.responseCode === 0) {
  return result.data.data
}
else {
  console.log(result.data.responseMessage)
}
}
catch(e){console.log(e)}

}


export async function getMerchants(orgCode) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/organisations/merchants/' + orgCode + '/3', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}


export async function getRoles() {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/roles', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}


export async function getRole(roleName) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/roles/' + roleName, {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}

export async function getPermissions() {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/permissions', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}

export async function getPermission(roleName) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/roles/' + roleName + '/permissions', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}


export async function getBands() {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/bands', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}


export async function getMerTransaction(merCode) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/transactions/merchant/' + merCode + '?orderBy=serviceName&pageNumber=1&recordsPerPage=10', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}



export async function getCategory() {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/services/category', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}

export async function getServiceCategory(page,records,categoryName) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL +  '/services/category/' + categoryName + `?orderBy=serviceName&pageNumber=${page}&recordsPerPage=${records}`, {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })

    if(result.data.responseCode === 0) {
      localStorage.setItem('ser-tcP', page)
localStorage.setItem('ser-tR', records)
      return result.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}


export async function getTerminal() {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axiosInstance().get(process.env.REACT_APP_BACKEND_URL + '/applications', {
        headers: {
          'Authorization': `Bearer ${local_token}` 
        }
      })
    if(result.data.responseCode === 0) {
      return result.data.data
    }
    else {
      console.log(result.data.responseMessage)
    }
   }
   catch(e){console.log(e)}
    
}
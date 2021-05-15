import axios from 'axios'
import url from './baseUrl.json'

export function currentUser()  {
    const local_user = localStorage.getItem('user');
    return JSON.parse(local_user);
}

export async function getOrganisations() {
    const local_token = localStorage.getItem('token');
    try {
        const result = await axios.get(url.url + '/organisations/parent/' + url.org_code, {
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
        const result = await axios.get(url.url + '/organisations/' + orgCode, {
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

export async function getServiceProviders() {
    const local_token = localStorage.getItem('token');
  try {
    const result = await axios.get(url.url + '/services/providers' , {
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
  const result = await axios.get(url.url + '/services/providers/' + provCode , {
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
  const result = await axios.get(url.url + '/services/charges/' + provId , {
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

export async function getServices() {
    const local_token = localStorage.getItem('token');
  try {
    const result = await axios.get(url.url + '/services' , {
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

export async function getTransactions() {
    const local_token = localStorage.getItem('token');
  try {
    const result = await axios.get(url.url + '/transactions?orderBy=serviceName&pageNumber=1&recordsPerPage=10' , {
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

export async function getUsers() {
        const local_token = localStorage.getItem('token');
      try {
        const result = await axios.get(url.url + '/organisations/users/' + url.org_code , {
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
  const result = await axios.get(url.url + '/merchants/users/' + merCode , {
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
      const result = await axios.get(url.url + '/organisations/merchants/' + orgCode + '/3', {
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
      const result = await axios.get(url.url + '/roles', {
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
      const result = await axios.get(url.url + '/roles/' + roleName, {
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
      const result = await axios.get(url.url + '/permissions', {
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
      const result = await axios.get(url.url + '/roles/' + roleName + '/permissions', {
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
      const result = await axios.get(url.url + '/bands', {
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
      const result = await axios.get(url.url + '/transactions/merchant/' + merCode + '?orderBy=serviceName&pageNumber=1&recordsPerPage=10', {
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
      const result = await axios.get(url.url + '/services/category', {
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

export async function getServiceCategory(categoryName) {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axios.get(url.url +  '/services/category/' + categoryName + '?orderBy=serviceName&pageNumber=1&recordsPerPage=10', {
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

export async function getTerminal() {
  const local_token = localStorage.getItem('token');
  try {
      const result = await axios.get(url.url + '/applications', {
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

import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Overview from './pages/overview/overview'
import Organisations from './pages/organisations/organisations'
import Organisation from './pages/organisations/organisation/organisation'
import Merchant from './pages/organisations/organisation/merchant/merchant'
import ServiceProviders from './pages/service-providers/service-providers'
import Transactions from './pages/transactions/transactions'
import Provider from './pages/service-providers/provider/provider'
import ApiManagement from './pages/api-management/api'
import ApiService from './pages/api-management/service'
import UserManagement from './pages/user-management/user'
import CreateRole from './pages/user-management/Roles/createRoles'
import EditRole from './pages/user-management/Roles/editRoles'
import Settings from './pages/settings/settings'
import VerifyEmail from './pages/verify-email/verifiy-email'

function App() {

  return (
    <BrowserRouter>
      <Switch>
     <Route exact path='/' component = { Login } />  
     <Route path='/overview' component = { Overview } />  
     <Route path='/organisations' component = { Organisations } />  
     <Route path='/organisation/:id' component = { Organisation } />  
     <Route path='/merchant/:id' component = { Merchant } />  
     <Route path='/transactions' component = { Transactions } /> 
     <Route path='/service-providers' component = { ServiceProviders } />  
     <Route path='/service-provider/:id' component = { Provider } /> 
     <Route path='/settings' component = { Settings } /> 
     <Route path='/api-service/:id' component = { ApiService } />  
     <Route path='/user-management' component = { UserManagement } />   
     <Route path='/create-role/:id' component = { CreateRole } />   
     <Route path='/edit-role/:id' component = { EditRole } />   
     <Route path='/verifyemail/:id' component = { VerifyEmail } />   
      </Switch>
    </BrowserRouter>
  );
}

export default App;

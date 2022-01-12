import './App.css';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/signIn/Login';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ForgetPassword from './Pages/forgetPassword/ForgetPassword';
import SsoLogin from './Pages/signIn/SsoLogin';
import ResetPassword from './Pages/resetPassword/ResetPassword';
import Landing from './Pages/LandingPage/landing';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/resetpassword/:token" component={ResetPassword} />
        <Route path="/ssologin/:token" component={SsoLogin} />
        <Home />
      </Switch>
    </div>
  );
}

export default App;

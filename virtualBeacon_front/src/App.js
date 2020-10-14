import React, { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import PasswordReset from './components/PasswordReset';

import './App.css';

export default function App() {

  const [manageAppAlert, setManageAppAlert] = useState({ alert: false, message: 'default' })
  const [redirect, setRedirect] = useState(null);
  const cookies = useCookies();

  const handleAlert = (msg) => {
    setManageAppAlert({ ...manageAppAlert, alert: true, message: msg })
    setTimeout(() => {
      setManageAppAlert({ ...manageAppAlert, alert: false })
    }, 2000);
  }

  useEffect(() => {
    if (cookies["userTokenBeacon"]) {
      setRedirect("/dashboard");
    } else {
      setRedirect(null)
    }
  }, [cookies]);

  return (
    <div className="App">
      {cookies["userToken"] && < Redirect push to={redirect} />}
      <div>
        <CookiesProvider>
          <Router>
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard alert={handleAlert} />
              </Route>
              <Route path="/password">
                <PasswordReset alert={handleAlert} />
              </Route>
              <Route exact path="/">
                <Home alert={handleAlert} />
              </Route>
            </Switch>
          </Router>
        </CookiesProvider>
      </div>
      {manageAppAlert.alert ?
        <div className="App-alert">{manageAppAlert.message}</div>
        :
        ''}
    </div>
  );
}
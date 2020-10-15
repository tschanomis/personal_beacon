import React, { useState } from 'react';
import { CookiesProvider } from "react-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import PasswordReset from './components/PasswordReset';

import './App.css';

export default function App() {

  const [manageAppAlert, setManageAppAlert] = useState({ alert: false, message: 'default' })

  const handleAlert = (msg) => {
    setManageAppAlert({ ...manageAppAlert, alert: true, message: msg })
    setTimeout(() => {
      setManageAppAlert({ ...manageAppAlert, alert: false })
    }, 2000);
  }

  return (
    <div className="App">
      <div>
        <CookiesProvider>
          <Router>
            <Switch>
              <Route path="/dashboard">
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
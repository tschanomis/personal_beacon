import React, { useState } from 'react';
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
  const [manageToken, setManageToken] = useState({ token: null })


  const handleToken = (token) => {
    setManageToken({ ...manageToken, token: token })
  }

  const handleAlert = (msg) => {
    setManageAppAlert({ ...manageAppAlert, alert: true, message: msg })
    setTimeout(() => {
      setManageAppAlert({ ...manageAppAlert, alert: false })
    }, 2000);
  }

  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard giveToken={manageToken.token} alert={handleAlert} />
            </Route>
            <Route path="/password">
              <PasswordReset alert={handleAlert} />
            </Route>
            <Route exact path="/">
              <Home getToken={handleToken} alert={handleAlert} />
            </Route>
          </Switch>
        </Router>
      </div>
      {manageAppAlert.alert ?
        <div className="App-alert">{manageAppAlert.message}</div>
        :
        ''}
    </div>
  );
}
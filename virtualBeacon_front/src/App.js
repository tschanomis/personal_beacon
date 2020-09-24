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

  const [manageAppBasic, setManageAppBasic] = useState({
    token: null,
    alert: false,
    message: 'default'
  })

  const handleToken = (token) => {
    setManageAppBasic(...manageAppBasic, { token: token })
  }

  const handleAlert = (msg) => {
    setManageAppBasic(...manageAppBasic, { alert: true, message: msg })
    setTimeout(() => {
      setManageAppBasic(...manageAppBasic, { alert: false })
    }, 2000);
  }

  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard giveToken={manageAppBasic.token} alert={handleAlert} />
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
      {manageAppBasic.alert ?
        <div className="App-alert">{manageAppBasic.message}</div>
        :
        ''}
    </div>
  );
}
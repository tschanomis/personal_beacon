import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import PasswordReset from './components/PasswordReset';

import './App.css';


class App extends React.Component {
  state = {
    token: null,
    alert: false,
    message: 'default'
  }

  handleToken = (token) => {
    this.setState({ token: token })
  }

  handleAlert = (msg) => {
    this.setState({ alert: true, message: msg })
    setTimeout(() => {
      this.setState({ alert: false, message: msg })
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard giveToken={this.state.token} alert={this.handleAlert} />
              </Route>
              <Route path="/password">
                <PasswordReset alert={this.handleAlert} />
              </Route>
              <Route exact path="/">
                <Home getToken={this.handleToken} alert={this.handleAlert} />
              </Route>
            </Switch>
          </Router>
        </div>
        {this.state.alert ?
          <div className="App-alert">{this.state.message}</div>
          :
          ''}
      </div>
    );
  }
}

export default App;

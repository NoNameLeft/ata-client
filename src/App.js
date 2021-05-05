import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';

import './App.css';
import * as usersService from './services/usersService';
import * as common from './shared/common';

class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: common.DEFAULT_LOGIN_STATUS,
      uname: common.DEFAULT_USER
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    var userToken = localStorage.getItem(common.STORAGE_KEY);

    if(userToken) {
      try {
        var userData = jwt.verify(userToken, common.TOKEN_SECRET);
        
        usersService.loggedInStatus(userData.userID)
          .then(res => {
            if(res.length > 0) {
              this.handleLogin(res[0].name);
            }
          })
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
    else {
      this.setState({
        loggedInStatus: common.DEFAULT_LOGIN_STATUS,
        uname: common.DEFAULT_USER
      });
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: common.DEFAULT_LOGIN_STATUS,
      uname: common.DEFAULT_USER
    });
  }

  handleLogin(name) {
    this.setState({
      loggedInStatus: common.LOGGED_IN_STATUS,
      uname: name
    });
  }

  render() {
    return (
        <div>
          <>
            <ToastContainer draggable={false} transition={Zoom} autoClose={3000} position={'top-center'}/>
          </>
          <Header 
            loggedInStatus={this.state.loggedInStatus}
            handleLogout={this.handleLogout}
           />
          <Switch>
            <Route exact path="/" render={() => {
              return <Home uname={this.state.uname} />
            }} />
            <Route path="/about" render={() => {
              return <About userStatus={this.state.loggedInStatus} />
            }} />
            <Route path="/register" component={Register} />
            <Route path="/login" render={() => {
              return <Login handleLogin={this.handleLogin} />
            }} />
            <Route path="/logout" render={() => {
              localStorage.removeItem(common.STORAGE_KEY);
              return <Redirect to="/" />
            }} />
          </Switch>
        </div>
    )
  }
}

export default App;

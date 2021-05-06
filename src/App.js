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
import Profile from './components/Profile';

import './App.css';
import * as usersService from './services/usersService';
import * as common from './shared/common';

class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: common.DEFAULT_LOGIN_STATUS,
      uname: common.DEFAULT_USER,
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    jwt.verify(localStorage.getItem(common.STORAGE_KEY), common.TOKEN_SECRET, (err, decoded) => {
      if(!err) {
          usersService.getCurrentUser(decoded.userID)
          .then(res => {
            let user = res.find(Boolean);
            this.handleLogin(user.name);
          })
          .catch(err => {
              console.log(err);
              this.handleLogout();
          });
      }
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    localStorage.removeItem(common.STORAGE_KEY);
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
            <Route path="/about" component={About} />
            <Route path="/register" component={Register} />
            <Route path="/login" render={() => {
              return <Login handleLogin={this.handleLogin} />
            }} />
            <Route path="/logout" render={() => {
              localStorage.removeItem(common.STORAGE_KEY);
              return <Redirect to="/" />
            }} />
            <Route path="/profile" render={() => {
              return <Profile userStatus={this.state.loggedInStatus} />
            }} />
          </Switch>
        </div>
    )
  }
}

export default App;

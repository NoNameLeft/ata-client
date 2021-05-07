import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

import './App.css';
import auth from './middlewares/auth';
import * as common from './shared/common';
import * as usersService from './services/usersService';
import { ProtectedRoute } from './middlewares/protectedRoute';

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

  componentDidMount() {
    let userInfo = auth.isAuthenticated();
    if(userInfo.isAuth) {
      usersService.getCurrentUser(userInfo.currentUserId)
        .then(res => {
          this.handleLogin(res.find(Boolean).name);
        })
        .catch(err => {
          console.log(err);
          this.handleLogout();
        });
    }
    else {
      this.handleLogout();
    }
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
            <ProtectedRoute exact path="/about" component={About} />
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

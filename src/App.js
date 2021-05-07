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
import * as themes from './shared/themes';
import { ProtectedRoute } from './hocs/protectedRoute';
import { ThemeProvider } from 'styled-components';

class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: common.DEFAULT_LOGIN_STATUS,
      uname: common.DEFAULT_USER,
      theme: themes.LIGHT_THEME
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeThemeColor = this.changeThemeColor.bind(this);
  }

  componentDidMount() {
    let authUserData = auth.isAuthenticated();
    if (authUserData.isAuth) {
      usersService.getCurrentUser(authUserData.currentUserId)
        .then(res => { this.handleLogin(res.find(Boolean).name) })
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

  changeThemeColor() {
    this.setState(prevState => ({
      theme: prevState.theme === themes.LIGHT_THEME ? themes.DARK_THEME : themes.LIGHT_THEME
    }));
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme === "light" ? themes.LIGHT_STYLE : themes.DARK_STYLE}>
        <themes.GlobalStyles />
        <div>
          <>
            <ToastContainer draggable={false} transition={Zoom} autoClose={3000} position={'top-center'} />
          </>
          <Header
            loggedInStatus={this.state.loggedInStatus}
            handleLogout={this.handleLogout}
            changeThemeColor={this.changeThemeColor}
            currentTheme={this.state.theme}
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
      </ThemeProvider>
    )
  }
}

export default App;

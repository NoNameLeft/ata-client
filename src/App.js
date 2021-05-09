import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ToastContainer, Zoom } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
import Register from './components/Register';
import EditProfile from './components/EditProfile';

import './App.css';
import auth from './middlewares/auth';
import * as common from './shared/common';
import * as themes from './shared/themes';
import { ProtectedRoute } from './hocs/protectedRoute';
import * as usersService from './services/usersService';
import AuthContext from './contexts/AuthContext';

class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: common.DEFAULT_LOGIN_STATUS,
      theme: themes.LIGHT_THEME,
      currentUser: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeThemeColor = this.changeThemeColor.bind(this);
  }

  componentDidMount() {
    let authUserData = auth.isAuthenticated();
    if (authUserData.isAuth) {
      usersService.getCurrentUser(authUserData.currentUserId)
        .then(res => { this.handleLogin(res) })
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
      currentUser: {}
    });
  }

  handleLogin(user) {
    this.setState({
      loggedInStatus: common.LOGGED_IN_STATUS,
      currentUser: user
    });
  }

  changeThemeColor() {
    this.setState(prevState => ({
      theme: prevState.theme === themes.LIGHT_THEME ? themes.DARK_THEME : themes.LIGHT_THEME
    }));
  }

  render() {
    const authInfo = {
      user: {
        id: this.state.currentUser.id,
        name: this.state.currentUser.name,
        email: this.state.currentUser.email,
        status: this.state.loggedInStatus
      }
    };

    return (
      <ThemeProvider theme={this.state.theme === themes.LIGHT_THEME ? themes.LIGHT_STYLE : themes.DARK_STYLE}>
        <themes.GlobalStyles />
        <div>
          <AuthContext.Provider value={authInfo}>
            <>
              <ToastContainer draggable={false} transition={Zoom} autoClose={3000} position={'top-center'} />
            </>
            <Header
              currentTheme={this.state.theme}
              handleLogout={this.handleLogout}
              changeThemeColor={this.changeThemeColor}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/about" component={About} />
              <Route path="/register" component={Register} />
              <Route path="/login" render={() => {
                return <Login handleLogin={this.handleLogin} />
              }} />
              <Route path="/profile" render={() => {
                return <Profile handleLogout={this.handleLogout} />
              }} />
              <ProtectedRoute exact path="/editProfile" component={EditProfile} />
              <Route path="/logout" render={() => {
                localStorage.removeItem(common.STORAGE_KEY);
                return <Redirect to="/" />
              }} />
            </Switch>
          </AuthContext.Provider>
        </div>
      </ThemeProvider>
    )
  }
}

export default App;

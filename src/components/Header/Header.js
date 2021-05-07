import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import * as common from '../../shared/common';
import * as messages from '../../shared/messages';
import './Header.css';

export default class Header extends Component {
    constructor() {
        super();
    
        this.state = {
          isBurgerMenuClicked: false
        }
    
        this.handleBurgerMenuClick = this.handleBurgerMenuClick.bind(this);
        this.userLogout = this.userLogout.bind(this);
    }

    handleBurgerMenuClick() {
        this.setState(prevState => ({
            isBurgerMenuClicked: !prevState.isBurgerMenuClicked
        }));
    }

    userLogout() {
        toast.info(messages.LOGOUT_SUCCESS_MESSAGE);
        this.props.handleLogout();
    }

    render() {
        // TODO: try to think of better way to hide/display these elements!
        const loginStyle = this.props.loggedInStatus === common.LOGGED_IN_STATUS ? "none" : "";
        const logoutStyle = loginStyle !== "none" ? "none" : "";
        const burgerMenuBarsStyle = this.state.isBurgerMenuClicked ? "change" : "";

        return (
            <div className="header">
                <Link to="/about" className="header__logo">ATA</Link>
                <div className={`header__burger ${burgerMenuBarsStyle}`} onClick={this.handleBurgerMenuClick} >
                    <div className="topline"></div>
                    <div className="middleline"></div>
                    <div className="bottomline"></div>
                </div>
                <div className={`header__navbar ${burgerMenuBarsStyle}`}>
                    <ul>
                        <li>
                            <NavLink exact={true} to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink style={{display: `${loginStyle}`}} to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink style={{display: `${loginStyle}`}} to="/register">Register</NavLink>
                        </li>
                        <li>
                            <Link style={{display: `${logoutStyle}`}} onClick={this.userLogout} to="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};
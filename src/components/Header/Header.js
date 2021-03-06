import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';
import AuthContext from '../../contexts/AuthContext';

import * as common from '../../shared/common';
import * as messages from '../../shared/messages';
import ErrorBoundary from '../ErrorBoundary';

import './Header.css';
export default class Header extends Component {
    static contextType = AuthContext

    constructor() {
        super();

        this.state = {
            isBurgerMenuClicked: false
        }

        this.userLogout = this.userLogout.bind(this);
        this.handleBurgerMenuClick = this.handleBurgerMenuClick.bind(this);
        this.handlechangeThemeColor = this.handlechangeThemeColor.bind(this);
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

    handlechangeThemeColor() {
        this.props.changeThemeColor();
    }

    render() {
        // TODO: try to think of better way to hide/display these elements!
        const guestUserLinks = this.context.user.status === common.LOGGED_IN_STATUS ? "none" : "";
        const loggedInUserLinks = guestUserLinks !== "none" ? "none" : "";
        const burgerMenuBarsStyle = this.state.isBurgerMenuClicked ? "change" : "";

        return (
            <ErrorBoundary>
                <div className="header">
                    <Link to="/about" className="header__logo">ATA</Link>
                    <label className="header__switch">
                        <input type="checkbox" defaultChecked onChange={this.handlechangeThemeColor} />
                        <span className="switch__slider round"></span>
                        <span className="slider__state">{this.props.currentTheme}</span>
                    </label>
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
                                <NavLink style={{ display: `${guestUserLinks}` }} to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink style={{ display: `${guestUserLinks}` }} to="/register">Register</NavLink>
                            </li>
                            <li>
                                <Link style={{ display: `${loggedInUserLinks}` }} to="/contacts">Contacts</Link>
                            </li>
                            <li>
                                <Link style={{ display: `${loggedInUserLinks}` }} onClick={this.userLogout} to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </ErrorBoundary>
        )
    }
};
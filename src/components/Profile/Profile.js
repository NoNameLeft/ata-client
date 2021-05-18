import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { FaFacebook, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';

import auth from '../../middlewares/auth';
import AuthContext from '../../contexts/AuthContext';
import * as common from '../../shared/common';
import * as messages from '../../shared/messages';
import * as usersService from '../../services/usersService';
import ErrorBoundary from '../ErrorBoundary';

import './Profile.css';
const Profile = (props) => {
    const contextValue = useContext(AuthContext);

    let history = useHistory();

    let [userInfo, setUserInfo] = useState({});
    let [displayStyleProps, setDisplayStyleProps] = useState("none");

    /*
        When user update their info it redirects directly to profile page.
        To avoid 'useEffect' hook I used context value.
        However the info doesn't update without page refresh.
        So, I went back to just getting the user data every time they click their profile page.
    */
    useEffect(() => {
        let authUserData = auth.isAuthenticated();
        if (authUserData.isAuth) {
            usersService.getCurrentUser(authUserData.currentUserId)
                .then(res => { setUserInfo(res) })
                .catch(err => console.log(err));
        }
    }, []);

    function changeSecretCardStyle() {
        if (localStorage.getItem('utoken')) {
            setDisplayStyleProps(displayStyleProps === "none" ? "block" : "none");
        } else {
            toast.error(messages.GUEST_USER_ERROR);
            history.push('/login');
        }
    }

    function handleChangeCardStyle(e) {
        e.preventDefault();
        changeSecretCardStyle();
        history.push('/profile');
    }

    function redirectToEditPage() {
        if (localStorage.getItem('utoken')) {
            history.push('/editProfile');
        } else {
            toast.error(messages.GUEST_USER_ERROR);
            history.push('/login');
        }
    }

    function handleDeleteAccount(e) {
        e.preventDefault();
        usersService.deleteUser(userInfo.id)
            .then(() => {
                props.handleLogout();
                toast.info("Account successfully deleted");
                history.push('/');
            }).catch(err => console.log(err))
    }

    /*
        I still get the user status via context value, because users cannot access EditProfile page, if they aren't logged in. 
    */
    const status = contextValue.user.status === common.LOGGED_IN_STATUS ? common.ONLINE_USER : common.OFFLINE_USER

    return (
        <ErrorBoundary>
            <div className="card">
                <img className="card__img" src="/avatar.png" alt='profile avatar' />
                <h1>{userInfo.name}</h1>
                <p className="card__title">You are currently {status}!</p>
                <p>{userInfo.email}</p>
                <div className="card__icons">
                    <Link to="#"> <FaFacebook /> </Link>
                    <Link to="#"> <FaTwitter /> </Link>
                    <Link to="#"> <FaLinkedin /> </Link>
                    <Link to="#"> <FaDribbble /> </Link>
                </div>
                <div className="card__btns">
                    <button className="editBtn" onClick={redirectToEditPage}>Edit Profile</button>
                    <button className="deleteBtn" onClick={changeSecretCardStyle}>Delete Profile</button>
                </div>
                <div className="card__secret" style={{ display: displayStyleProps }}>
                    <span className="closeBtn" onClick={changeSecretCardStyle}>&times;</span>
                    <form className="secret__content">
                        <div className="content__container">
                            <h1>Permanently delete account</h1>
                            <p>Are you sure you want to remove your account?</p>
                            <div className="container__btns">
                                <button className="cancelBtn" onClick={handleChangeCardStyle}>Cancel</button>
                                <button className="removeBtn" onClick={handleDeleteAccount}>Confirm</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ErrorBoundary>
    )
};

export default Profile;
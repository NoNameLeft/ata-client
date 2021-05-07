import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaFacebook, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';

import * as common from '../../shared/common';
import * as usersService from '../../services/usersService';
import auth from '../../middlewares/auth';
import './Profile.css';

const Profile = (props) => {
    
    let [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        let authUserData = auth.isAuthenticated();
        if(authUserData.isAuth) {
            usersService.getCurrentUser(authUserData.currentUserId)
            .then(res => { setUserInfo(res.find(Boolean)) })
            .catch(err => console.log(err));
        }
    }, []);

    const status = props.userStatus === common.LOGGED_IN_STATUS ? "online" : "offline"
    
    return (
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
            <p><button className="card__btn">Contact</button></p>
        </div>
    )
};

export default Profile;
import { useEffect, useState } from 'react';

import * as usersService from '../../services/usersService';
import ErrorBoundary from '../ErrorBoundary';

import './About.css';
const About = () => {
    let [userCount, setUserCount] = useState(0);

    useEffect(() => {
        usersService.getAllUsers()
            .then(res => {
                setUserCount(res.length);
            })
            .catch(err => console.log(err));
    });

    return (
        <ErrorBoundary>
            <div className="about">
                <h1>Welcome to <span>ABOUT</span> page</h1>
                <h3>We currently have <span>{userCount}</span> registered users!</h3>
            </div>
        </ErrorBoundary>
    );
};

export default About;
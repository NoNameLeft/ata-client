import { useContext } from 'react';

import * as common from '../../shared/common';
import AuthContext from '../../contexts/AuthContext';
import ErrorBoundary from '../ErrorBoundary';

import './Home.css';
const Home = () => {
    const contextValue = useContext(AuthContext);
    return (
        <ErrorBoundary>
            <div className="home">
                <h1>Welcome to <span>HOME</span> page</h1>
                <h3>Hello, <span>{contextValue.user.name === undefined ? common.DEFAULT_USER : contextValue.user.name}</span>!</h3>
            </div>
        </ErrorBoundary>
    );
};

export default Home;
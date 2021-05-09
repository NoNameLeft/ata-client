import './Home.css';
import * as common from '../../shared/common';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

const Home = () => {
    const contextValue = useContext(AuthContext);

    return (
        <div className="home">
            <h1>Welcome to <span>HOME</span> page</h1>
            <h3>Hello, <span>{contextValue.user.name === undefined ? common.DEFAULT_USER : contextValue.user.name}</span>!</h3>
        </div>
    );
};

export default Home;
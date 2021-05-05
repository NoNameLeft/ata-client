import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import jwt from 'jsonwebtoken';
import { sha256 } from 'js-sha256';
import { toast } from 'react-toastify';

import * as usersService from '../../services/usersService';
import * as common from '../../shared/common';
import './Login.css';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    let history = useHistory();

    function loginUser(e) {
        e.preventDefault();

        const userData = {
            email,
            password: sha256(psw),
        }

        usersService.login(userData)
            .then(res => {
                if(res.length === 0) {
                    toast.error('Invalid email or password');
                }
                else {
                    localStorage.setItem(common.STORAGE_KEY, jwt.sign({ userID: res[0].id }, common.TOKEN_SECRET, { expiresIn: '2 days' }));
                    props.handleLogin(res[0].name);
                    toast.success('You have successfully logged in');
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={loginUser}>
        <div className="container">
            <h1>Login</h1>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="psw" onChange={(e) => setPsw(e.target.value)} required />

            <button type="submit" className="loginbtn">Login</button>
        </div>
  
        <div className="container signup">
            <p>You do not have an account? <Link to="/register">Sign up</Link>?</p>
        </div>
    </form>
    );
};

export default Login;
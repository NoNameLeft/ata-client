import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import { sha256 } from 'js-sha256';
import { toast } from 'react-toastify';

import * as usersService from '../../services/usersService';
import * as messages from '../../shared/messages';
import ErrorBoundary from '../ErrorBoundary';

const Register = () => {
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [psw, setPsw] = useState('');
    const [pswRepeat, setPswRepeat] = useState('');

    let history = useHistory();

    function registerUser(e) {
        e.preventDefault();

        if (psw === pswRepeat) {
            const userData = {
                id: uuidv4(),
                email,
                name: uname,
                password: sha256(psw),
            }

            usersService.register(userData)
                .then(() => {
                    toast.success(messages.REGISTER_SUCCESS_MESSAGE);
                    history.push('/login');
                })
                .catch(err => {
                    console.log(err);
                    toast.error(messages.GENERIC_ERROR_MESSAGE);
                });
        }
    }

    return (
        <ErrorBoundary>
            <form onSubmit={registerUser}>
                <div className="container">
                    <h1>Register</h1>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="uname"><b>Name</b></label>
                    <input type="text" placeholder="Enter Your Name" name="uname" id="uname" onChange={(e) => setUname(e.target.value)} required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" id="psw" onChange={(e) => setPsw(e.target.value)} required />

                    <label htmlFor="pswRepeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="pswRepeat" id="pswRepeat" onChange={(e) => setPswRepeat(e.target.value)} required />

                    <button type="submit" className="primarybtn">Register</button>

                    <div className="container__secondary">
                        <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                    </div>
                </div>
            </form>
        </ErrorBoundary>
    );
};

export default Register;
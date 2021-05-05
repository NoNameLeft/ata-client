import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import { sha256 } from 'js-sha256';
import { toast } from 'react-toastify';

import * as usersService from '../../services/usersService';

import './Register.css';
const Register = () => {
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [psw, setPsw] = useState('');
    const [pswRepeat, setPswRepeat] = useState('');
    
    let history = useHistory();

    function registerUser(e) {
        e.preventDefault();
        

        if(psw === pswRepeat) {
            const userData = {
                id: uuidv4(),
                email,
                name: uname,
                password: sha256(psw),
            }
            
            usersService.register(userData)
                .then(() => {
                    toast.success('You have successfully registered');
                    history.push('/login');
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Something went wrong! Try again!");
                });
        }
    }

    return (
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

            <button type="submit" className="registerbtn">Register</button>
        </div>
  
        <div className="container signin">
            <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
        </div>
    </form>
    );
};

export default Register;
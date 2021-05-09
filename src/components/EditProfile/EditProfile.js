import { useContext, useState } from "react";
import { useHistory } from "react-router";

import AuthContext from "../../contexts/AuthContext";
import * as usersService from '../../services/usersService';

const EditProfile = () => {
    const contextValue = useContext(AuthContext);

    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');

    let history = useHistory();

    function handleSaveChanges(e) {
        e.preventDefault();
        usersService.getCurrentUser(contextValue.user.id)
            .then(res => {
                let updatedUser = {...res, name: updatedName === "" ? contextValue.user.name : updatedName, email: updatedEmail === "" ? contextValue.user.email : updatedEmail};
                usersService.update(contextValue.user.id, updatedUser)
                    .then(() => {
                        history.push('/profile');
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    }

    return (
        <div className="card">
            <img className="card__img" src="/avatar.png" alt='profile avatar' />
            <label  htmlFor="name">Enter your name:</label>
            <input type="text" className="name" placeholder={contextValue.user.name} style={{textAlign:"center"}} onChange={(e) => {setUpdatedName(e.target.value)}}></input>
            <label htmlFor="email">Enter your email:</label>
            <input type="text" className="email" placeholder={contextValue.user.email} style={{textAlign:"center"}} onChange={(e) => {setUpdatedEmail(e.target.value)}}></input>
            <div className="card__btns">
                <button className="editBtn" onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </div>
    )
};

export default EditProfile;
import jwt from 'jsonwebtoken';

import * as common from '../shared/common';

class Auth {
    constructor() {
        this.authenticated = false;
        this.userID = "";
        
        this.verifyUser = this.verifyUser.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    verifyUser() {
        try {
            let userToken = localStorage.getItem(common.STORAGE_KEY);
            let tokenUserData = jwt.verify(userToken, common.TOKEN_SECRET);
            
            this.userID = tokenUserData.userID;
            this.authenticated = true;
        } catch {
            this.authenticated = false;
            this.userID = "";
        }
    }

    isAuthenticated() {
        this.verifyUser();
        
        return {
            isAuth: this.authenticated,
            currentUserId: this.userID
        }
    }
}

export default new Auth();
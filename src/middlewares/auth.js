import jwt from 'jsonwebtoken';

import * as common from '../shared/common';

class Auth {
    constructor() {
        this.authenticated = false;
        this.userID = "";
    }

    verifyUser() {
        try {
            let userToken = localStorage.getItem(common.STORAGE_KEY);
            let tokenUserData = jwt.verify(userToken, common.TOKEN_SECRET);
            
            this.userID = tokenUserData.userID;
            this.authenticated = true;
        } catch {
            this.authenticated = false;
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
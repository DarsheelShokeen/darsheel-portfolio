import { db } from './store.js';

class Auth {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('educloud_user')) || null;
    }

    login(email, password) {
        const user = db.getUserByEmail(email);
        if (user && user.password === password) {
            this.currentUser = user;
            localStorage.setItem('educloud_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('educloud_user');
        window.location.reload();
    }

    getUser() {
        return this.currentUser;
    }
    
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

export const auth = new Auth();

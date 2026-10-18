import { auth } from './auth.js';
import { renderLogin } from './views/Login.js';
import { renderDashboard } from './views/Dashboard.js';

class App {
    constructor() {
        this.root = document.getElementById('root');
        this.initTheme();
        this.render();
    }
    
    initTheme() {
        const savedTheme = localStorage.getItem('educloud_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    render() {
        this.root.innerHTML = '';
        if (auth.isAuthenticated()) {
            this.root.appendChild(renderDashboard());
        } else {
            this.root.appendChild(renderLogin());
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

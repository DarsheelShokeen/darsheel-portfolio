import { auth } from '../auth.js';

export function renderLogin() {
    const container = document.createElement('div');
    container.className = 'login-wrapper';
    
    container.innerHTML = \`
        <div class="login-box glass">
            <div style="margin-bottom: 1rem; text-align: left;">
                <a href="../projects.html" style="display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-secondary); text-decoration: none; font-size: 0.8rem; font-weight: 500;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                    Back to Portfolio
                </a>
            </div>
            <div class="flex items-center justify-center gap-2" style="margin-bottom: 2rem;">
                <div class="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <h2>EduCloud</h2>
            </div>
            
            <p class="text-secondary text-sm" style="text-align: center; margin-bottom: 1.5rem;">
                Sign in to your account
            </p>
            
            <form id="login-form">
                <div class="input-group">
                    <label>Email Address</label>
                    <input type="email" id="login-email" class="input-field" placeholder="admin@educloud.com" required>
                </div>
                <div class="input-group">
                    <label>Password</label>
                    <input type="password" id="login-password" class="input-field" placeholder="password123" required>
                </div>
                <button type="submit" class="btn btn-primary w-full" style="margin-top: 1rem;">Sign In</button>
            </form>
            
            <div style="margin-top: 2rem; font-size: 0.75rem; color: var(--text-muted); text-align: center;">
                <p><strong>Demo Accounts:</strong></p>
                <p>admin@educloud.com / teacher@educloud.com</p>
                <p>student@educloud.com / parent@educloud.com</p>
                <p>(Password: password123)</p>
            </div>
        </div>
    \`;

    const form = container.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = container.querySelector('#login-email').value;
        const pass = container.querySelector('#login-password').value;
        
        const res = auth.login(email, pass);
        if(res.success) {
            window.app.render();
        } else {
            alert('Login failed: ' + res.message);
        }
    });

    return container;
}

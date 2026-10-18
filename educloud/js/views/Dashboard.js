import { auth } from '../auth.js';
import { db } from '../store.js';
import { renderAdminView } from './AdminView.js';
import { renderTeacherView } from './TeacherView.js';
import { renderStudentView } from './StudentView.js';
import { renderParentView } from './ParentView.js';

export function renderDashboard() {
    const user = auth.getUser();
    const container = document.createElement('div');
    container.className = 'app-container';
    
    container.innerHTML = \`
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <h2>EduCloud</h2>
            </div>
            <nav class="nav-menu" id="nav-menu">
                <p class="text-xs text-muted" style="margin-bottom: 0.5rem; padding-left: 0.75rem; font-weight: 600; letter-spacing: 0.05em;">MENU</p>
                <a href="#" class="nav-link active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                    Dashboard
                </a>
                <a href="#" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Homework
                </a>
                <a href="#" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    Attendance
                </a>
            </nav>
            <div style="padding: 1.5rem; border-top: 1px solid var(--border);">
                <a href="../projects.html" class="nav-link w-full" style="margin-bottom: 0.5rem; text-decoration: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                    Portfolio
                </a>
                <button id="logout-btn" class="nav-link w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                    Log Out
                </button>
            </div>
        </aside>
        
        <main class="main-content">
            <header class="topbar">
                <div class="text-sm text-secondary">
                    Logged in as <strong>\${user.name}</strong> (\${user.role})
                </div>
                
                <div class="flex items-center gap-6">
                    <button id="theme-toggle" class="btn btn-outline" style="padding: 0.5rem; border-radius: 50%;">
                        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    </button>
                    
                    <div class="relative">
                        <button id="notif-btn" class="btn btn-outline" style="padding: 0.5rem; border-radius: 50%;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                            <span class="absolute" style="top:-2px; right:-2px; background:var(--danger); width:8px; height:8px; border-radius:50%;"></span>
                        </button>
                    </div>
                </div>
            </header>
            
            <div id="view-root" class="view-container">
                <!-- Role specific view injected here -->
            </div>
        </main>
    \`;

    // Logout
    container.querySelector('#logout-btn').addEventListener('click', () => {
        auth.logout();
    });

    // Theme Toggle
    container.querySelector('#theme-toggle').addEventListener('click', () => {
        const doc = document.documentElement;
        const current = doc.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        doc.setAttribute('data-theme', next);
        localStorage.setItem('educloud_theme', next);
    });

    // Inject Role View
    const viewRoot = container.querySelector('#view-root');
    if (user.role === 'admin') viewRoot.appendChild(renderAdminView(user));
    if (user.role === 'teacher') viewRoot.appendChild(renderTeacherView(user));
    if (user.role === 'student') viewRoot.appendChild(renderStudentView(user));
    if (user.role === 'parent') viewRoot.appendChild(renderParentView(user));

    return container;
}

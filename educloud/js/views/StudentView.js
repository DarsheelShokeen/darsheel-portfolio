import { db } from '../store.js';

export function renderStudentView(user) {
    const el = document.createElement('div');
    const classId = user.classId || 'N/A';
    
    // Fetch homework
    const homework = db.getHomeworkForClass(classId);
    
    el.innerHTML = \`
        <div style="margin-bottom: 2rem;">
            <h1>Student Dashboard</h1>
            <p class="text-secondary">Welcome back, \${user.name} (Class \${classId})</p>
        </div>
        
        <div class="grid-stats">
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-warning">!</div>
                <div>
                    <h3 class="text-sm text-secondary">Pending Homework</h3>
                    <h2>\${homework.length}</h2>
                </div>
            </div>
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-success">✓</div>
                <div>
                    <h3 class="text-sm text-secondary">Overall Attendance</h3>
                    <h2>96%</h2>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
            <div class="card">
                <h3>My Homework</h3>
                <div class="flex" style="flex-direction: column; gap: 1rem; margin-top: 1rem;">
                    \${homework.map(hw => \`
                        <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius-sm);">
                            <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
                                <h4>\${hw.title}</h4>
                                <span class="badge badge-warning">Pending</span>
                            </div>
                            <p class="text-sm text-secondary" style="margin-bottom: 1rem;">\${hw.description}</p>
                            <button class="btn btn-outline text-sm" onclick="alert('File upload mocked')">Submit Assignment</button>
                        </div>
                    \`).join('') || '<p class="text-sm text-muted">No pending homework!</p>'}
                </div>
            </div>
            
            <div class="card">
                <h3>Recent Attendance</h3>
                <div style="margin-top: 1rem;" class="text-sm">
                    <div class="flex justify-between" style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                        <span>Today</span>
                        <span class="badge badge-success">Present</span>
                    </div>
                    <div class="flex justify-between" style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                        <span>Yesterday</span>
                        <span class="badge badge-success">Present</span>
                    </div>
                </div>
            </div>
        </div>
    \`;
    return el;
}

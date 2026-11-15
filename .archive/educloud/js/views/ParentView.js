import { db } from '../store.js';

export function renderParentView(user) {
    const el = document.createElement('div');
    const children = db.getStudentByParent(user.id);
    
    // In a real app we'd have state, but we mock selecting the first child here
    const selectedChild = children[0] || null;
    const homework = selectedChild ? db.getHomeworkForClass(selectedChild.classId) : [];
    
    el.innerHTML = \`
        <div style="margin-bottom: 2rem;" class="flex justify-between items-center">
            <div>
                <h1>Parent Dashboard</h1>
                <p class="text-secondary">Monitoring \${selectedChild ? selectedChild.name : 'No children linked'}</p>
            </div>
            \${children.length > 0 ? \`
            <select class="input-field" style="width: 200px;">
                \${children.map(c => \`<option value="\${c.id}">\${c.name} (\${c.classId})</option>\`).join('')}
            </select>
            \` : ''}
        </div>
        
        <div class="grid-stats">
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-success">✓</div>
                <div>
                    <h3 class="text-sm text-secondary">Attendance</h3>
                    <h2>96%</h2>
                </div>
            </div>
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-warning">!</div>
                <div>
                    <h3 class="text-sm text-secondary">Pending Homework</h3>
                    <h2>\${homework.length}</h2>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
            <div class="card">
                <h3>Child's Homework</h3>
                <div class="flex" style="flex-direction: column; gap: 1rem; margin-top: 1rem;">
                    \${homework.map(hw => \`
                        <div class="flex justify-between items-center" style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius-sm);">
                            <div>
                                <h4>\${hw.title}</h4>
                                <p class="text-sm text-secondary">\${hw.description}</p>
                            </div>
                            <span class="badge badge-warning">Pending</span>
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

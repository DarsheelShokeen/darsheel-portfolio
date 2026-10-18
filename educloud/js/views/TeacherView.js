import { db } from '../store.js';

export function renderTeacherView(user) {
    const el = document.createElement('div');
    const classId = user.classAssigned || 'N/A';
    
    el.innerHTML = \`
        <div style="margin-bottom: 2rem;">
            <h1>Teacher Dashboard</h1>
            <p class="text-secondary">Class Teacher: \${classId}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
            
            <div class="flex" style="flex-direction: column; gap: 1.5rem;">
                <!-- Attendance Block -->
                <div class="card">
                    <div class="flex justify-between items-center" style="margin-bottom: 1rem;">
                        <h3>Mark Attendance</h3>
                        <span class="text-sm text-secondary">Today</span>
                    </div>
                    <div id="attendance-list">
                        <!-- Populated by JS -->
                        <p class="text-sm text-muted">Loading students...</p>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 1rem;">Submit Attendance</button>
                </div>
                
                <!-- Homework Block -->
                <div class="card">
                    <h3>Assign New Homework</h3>
                    <div class="input-group" style="margin-top: 1rem;">
                        <label>Title</label>
                        <input type="text" id="hw-title" class="input-field" placeholder="e.g. Science Project">
                    </div>
                    <div class="input-group">
                        <label>Description</label>
                        <textarea id="hw-desc" class="input-field" rows="3" placeholder="Details..."></textarea>
                    </div>
                    <button id="btn-assign-hw" class="btn btn-primary">Assign Homework</button>
                </div>
            </div>
            
            <div class="flex" style="flex-direction: column; gap: 1.5rem;">
                <div class="card">
                    <h3>Today's Periods</h3>
                    <div style="margin-top: 1rem;" class="text-sm">
                        <div class="flex justify-between" style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                            <span>09:00 - Physics 10A</span>
                            <span class="badge badge-success">Done</span>
                        </div>
                        <div class="flex justify-between" style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                            <span>11:00 - Math 10A</span>
                            <span class="badge badge-primary">Next</span>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Resource Materials</h3>
                    <button class="btn btn-outline w-full" style="margin-top: 1rem;">+ Upload Material</button>
                </div>
            </div>
        </div>
    \`;

    // Populate students for attendance
    setTimeout(() => {
        const list = el.querySelector('#attendance-list');
        const students = db.getUsers().filter(u => u.role === 'student' && u.classId === classId);
        
        if (students.length === 0) {
            list.innerHTML = '<p class="text-sm text-muted">No students found.</p>';
            return;
        }
        
        list.innerHTML = students.map(s => \`
            <div class="flex justify-between items-center" style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                <span class="text-sm">\${s.name}</span>
                <div class="flex gap-2">
                    <label class="text-xs"><input type="radio" name="att_\${s.id}" checked> Present</label>
                    <label class="text-xs"><input type="radio" name="att_\${s.id}"> Absent</label>
                    <label class="text-xs"><input type="radio" name="att_\${s.id}"> Short</label>
                </div>
            </div>
        \`).join('');
    }, 100);

    // Homework Assignment Logic
    el.querySelector('#btn-assign-hw').addEventListener('click', () => {
        const title = el.querySelector('#hw-title').value;
        const desc = el.querySelector('#hw-desc').value;
        if(title && desc) {
            db.addHomework({ title, description: desc, classId, teacherId: user.id, status: 'active' });
            el.querySelector('#hw-title').value = '';
            el.querySelector('#hw-desc').value = '';
            alert('Homework assigned and notifications sent to students & parents!');
        }
    });

    return el;
}

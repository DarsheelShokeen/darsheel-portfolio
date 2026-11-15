export function renderAdminView(user) {
    const el = document.createElement('div');
    el.innerHTML = \`
        <div style="margin-bottom: 2rem;">
            <h1>Admin Overview</h1>
            <p class="text-secondary">Full access to school records and staff management.</p>
        </div>
        
        <div class="grid-stats">
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-primary">S</div>
                <div>
                    <h3 class="text-sm text-secondary">Total Students</h3>
                    <h2>1,245</h2>
                </div>
            </div>
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-success">T</div>
                <div>
                    <h3 class="text-sm text-secondary">Teachers</h3>
                    <h2>84</h2>
                </div>
            </div>
            <div class="card flex items-center gap-4">
                <div class="logo-icon badge-warning">C</div>
                <div>
                    <h3 class="text-sm text-secondary">Active Classes</h3>
                    <h2>42</h2>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Recent System Activity</h3>
            <div style="margin-top: 1rem;" class="text-secondary text-sm">
                <p style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">Mrs. Johnson viewed attendance for Alex Johnson.</p>
                <p style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">Mr. Smith assigned new homework to 10A.</p>
                <p style="padding: 0.75rem 0;">System daily backup completed.</p>
            </div>
        </div>
    \`;
    return el;
}

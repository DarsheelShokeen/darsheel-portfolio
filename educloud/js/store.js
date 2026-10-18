// Mock Database built on LocalStorage to simulate Firebase

const defaultData = {
    users: [
        { id: 'admin1', name: 'Super Admin', role: 'admin', email: 'admin@educloud.com', password: 'password123' },
        { id: 'teacher1', name: 'Mr. Smith', role: 'teacher', email: 'teacher@educloud.com', password: 'password123', classAssigned: '10A' },
        { id: 'student1', name: 'Alex Johnson', role: 'student', email: 'student@educloud.com', password: 'password123', classId: '10A' },
        { id: 'parent1', name: 'Mrs. Johnson', role: 'parent', email: 'parent@educloud.com', password: 'password123', childrenIds: ['student1'] }
    ],
    homework: [
        { id: 'hw1', title: 'Algebra Equations', description: 'Solve chapters 1-5.', classId: '10A', teacherId: 'teacher1', dueDate: '2026-05-30', status: 'active' }
    ],
    submissions: [
        // { id, hwId, studentId, content, date }
    ],
    attendance: [
        // { id, classId, date, records: [{ studentId, status }] }
    ],
    notifications: []
};

class Store {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('educloud_db')) {
            localStorage.setItem('educloud_db', JSON.stringify(defaultData));
        }
    }

    getDb() {
        return JSON.parse(localStorage.getItem('educloud_db'));
    }

    saveDb(data) {
        localStorage.setItem('educloud_db', JSON.stringify(data));
    }

    getUsers() { return this.getDb().users; }
    
    getUserByEmail(email) {
        return this.getUsers().find(u => u.email === email);
    }
    
    getStudentByParent(parentId) {
        const db = this.getDb();
        const parent = db.users.find(u => u.id === parentId);
        if(!parent || !parent.childrenIds) return [];
        return db.users.filter(u => parent.childrenIds.includes(u.id));
    }

    getHomeworkForClass(classId) {
        return this.getDb().homework.filter(hw => hw.classId === classId);
    }
    
    addHomework(hw) {
        const db = this.getDb();
        hw.id = 'hw' + Date.now();
        db.homework.push(hw);
        this.saveDb(db);
        
        // Notification logic
        this.addNotification(\`New Homework: \${hw.title} assigned!\`, 'info');
        return hw;
    }

    addNotification(message, type) {
        const db = this.getDb();
        db.notifications.push({ id: Date.now(), message, type, date: new Date().toISOString() });
        this.saveDb(db);
    }
    
    getNotifications() {
        return this.getDb().notifications.reverse(); // Newest first
    }
}

export const db = new Store();

import db from './db.js';

class User {
    constructor({ name, email }) {
        this.name = name;
        this.email = email;
    }

    async save() {
        const [result] = await db.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [this.name, this.email]
        );
        return result;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM users ORDER BY id DESC');
        return rows;
    }

    static async update(id, { name, email }) {
        const [result] = await db.execute(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return result;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}

export default User;

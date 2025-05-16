import express, { json } from 'express';
import User from './user.js';

const app = express();
const port = 3000;

import cors from 'cors';

app.use(cors());        // ← tambahkan ini
app.use(json());


app.use(json());

app.get('/users', async (_req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch {
        res.status(500).json({ error: 'Gagal mengambil data users' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({ message: 'User berhasil dibuat', userId: result.insertId });
    } catch {
        res.status(500).json({ error: 'Gagal membuat user' });
    }
});

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.update(id, req.body);
        if (result.affectedRows > 0) {
            res.json({ message: 'User berhasil diupdate', updatedUser: req.body });
        } else {
            res.status(404).json({ error: 'User tidak ditemukan' });
        }
    } catch {
        res.status(500).json({ error: 'Gagal update user' });
    }
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.deleteById(id);
        if (result.affectedRows > 0) {
            res.json({ message: 'User berhasil dihapus' });
        } else {
            res.status(404).json({ error: 'User tidak ditemukan' });
        }
    } catch {
        res.status(500).json({ error: 'Gagal menghapus user' });
    }
});

app.get('/', (_req, res) => {
    res.send('Welcome to Express + MySQL API 🚀');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

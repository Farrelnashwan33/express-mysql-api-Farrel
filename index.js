const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'farrel1233'
});

connection.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke MySQL:', err);
    return;
  }
  console.log('✅ Berhasil terhubung ke MySQL!');
});

// Middleware logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to my web the User API!');
});

app.get('/api/hello', (req, res) => {
  console.log('Endpoint /api/hello diakses');
  res.json({ message: 'Halo dari REST API Node.js!' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.status(201).json({ received: data });
});

// Ambil semua pengguna
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Kesalahan saat mengambil data pengguna:', err);
      return res.status(500).json({ error: 'Gagal mengambil data pengguna' });
    }
    res.json(results);
  });
});

// Tambah pengguna
app.post('/users', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Nama dan email harus diisi' });
  }

  const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
  connection.query(query, [username, email], (err, result) => {
    if (err) {
      console.error('Gagal menyimpan data pengguna:', err);
      return res.status(500).json({ error: 'Gagal menyimpan data pengguna' });
    }

    res.status(201).json({
      message: 'Pengguna berhasil ditambahkan',
      userId: result.insertId,
    });
  });
});

// Update pengguna
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Nama dan email harus diisi' });
  }

  const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  connection.query(query, [username, email, userId], (err, result) => {
    if (err) {
      console.error('Gagal memperbarui data pengguna:', err);
      return res.status(500).json({ error: 'Gagal memperbarui data pengguna' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data pengguna berhasil diperbarui' });
  });
});

// Hapus pengguna
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Gagal menghapus pengguna:', err);
      return res.status(500).json({ error: 'Gagal menghapus pengguna' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

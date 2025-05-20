import express from 'express';
import cors from 'cors';
import db from './index.js'; // Pastikan kamu sudah bikin file ini

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Contoh route
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error ambil data users', error: err });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

import mysql from 'mysql2/promise';

const db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',       // ganti jika ada password
    database: 'test_db'
});

export default db;

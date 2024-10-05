const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // HTML, CSS, va client-side JavaScript fayllarini joylash uchun

const db = new sqlite3.Database('./back_seat.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Users table created or already exists.');
});

app.post('/api/signup', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Foydalanuvchi allaqachon mavjud yoki xatolik!' });
            }
            res.json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server xatosi' });
    }
});

app.listen(port, () => {
    console.log(`Server ${port}-portda ishga tushdi`);
});

// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./back_seat.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the SQLite database.');
// });

// db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE
// )`, (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Users table created or already exists.');
// });


// document.getElementById("signUpForm").addEventListener("submit", (e) => {
    
//     e.preventDefault()
    
//     const username = document.querySelector("#username").value
//     const password = document.querySelector("#password").value
//     const confirmPassword = document.querySelector("#confirmPassword").value
//     const email = document.querySelector("#email").value

//     if(confirmPassword != password){
//         alert("Kiritilgan parolningiz bir xil emas!")
//         return
//     }
//     if(username){
//         const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
//         if(!usernamePattern.test(username)){
//             alert("Foydalanuvchi nomida xatolik mavjud!")
//             return
//         }
//     }
//     const insert = db.prepare('INSERT INTO users (username,password, email) VALUES (?, ?,?)');
//     insert.run(username, password, email);
//     insert.finalize();
//     insert.run(username, password, email, (err) => {
//         if (err) {
//             console.error(err.message);
//             return; // Xatolik bo'lsa, chiqish
//         }
//         insert.finalize();
//         window.location.href = './index.html';
//     });

// } );


// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); 

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

   
//     if (username === '' || password === '') {
//         alert('Please fill in both fields.');
//     } else {
//         alert(`Welcome, ${username}!`);
//     }
// });
// --------------------------------------------------------

// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./back_seat.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the SQLite database.');
// });

// db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE
// )`, (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Users table created or already exists.');
// });

// document.getElementById("signUpForm").addEventListener("submit", (e) => {
//     e.preventDefault();

//     const username = document.querySelector("#username").value;
//     const password = document.querySelector("#password").value;
//     const confirmPassword = document.querySelector("#confirmPassword").value;
//     const email = document.querySelector("#email").value;

//     if (confirmPassword !== password) {
//         alert("Kiritilgan parol bir xil emas!");
//         return;
//     }
//     if (username) {
//         const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
//         if (!usernamePattern.test(username)) {
//             alert("Foydalanuvchi nomida xatolik mavjud!");
//             return;
//         }
//     }

//     const insert = db.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
//     insert.run(username, password, email, (err) => {
//         if (err) {
//             console.error(err.message);
//             alert('Foydalanuvchi allaqachon mavjud yoki xatolik!');
//             return; // Xatolik bo'lsa, chiqish
//         }
//         insert.finalize();
//         window.location.href = './index.html'; // Foydalanuvchini boshqa sahifaga yo'naltirish
//         db.all('SELECT * FROM users', [], (err, rows) => {
//             if (err) {
//                 throw err;
//             }
//             console.log(rows); // Ma'lumotlarni konsolga chiqaradi
//         });
        
//     });
// });

// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const username = document.getElementById('login-username').value; // login sahifasidagi ID
//     const password = document.getElementById('login-password').value; // login sahifasidagi ID

//     if (username === '' || password === '') {
//         alert('Iltimos, ikkita maydonni toldiring.')
//     } else {
//         alert(`Xush kelibsiz, ${username}!`);
//     }
// });

// -----------------------------------------------------------

// server.js (Node.js backend)
// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const bcrypt = require('bcrypt');
// const app = express();
// const port = 3000;

// app.use(express.json());

// const db = new sqlite3.Database('./back_seat.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the SQLite database.');
// });

// db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE
// )`, (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Users table created or already exists.');
// });

// app.post('/signup', async (req, res) => {
//     const { username, password, email } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], function(err) {
//             if (err) {
//                 return res.status(400).json({ error: 'Foydalanuvchi allaqachon mavjud yoki xatolik!' });
//             }
//             res.json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi', userId: this.lastID });
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Server xatosi' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server ${port}-portda ishga tushdi`);
// });

// main.js (Frontend JavaScript)
// document.addEventListener('DOMContentLoaded', () => {
//     const signUpForm = document.getElementById("signUpForm");
//     if (signUpForm) {
//         signUpForm.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             const username = document.querySelector("#username").value;
//             const password = document.querySelector("#password").value;
//             const confirmPassword = document.querySelector("#confirmPassword").value;
//             const email = document.querySelector("#email").value;

//             if (confirmPassword !== password) {
//                 alert("Kiritilgan parol bir xil emas!");
//                 return;
//             }

//             const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
//             if (!usernamePattern.test(username)) {
//                 alert("Foydalanuvchi nomida xatolik mavjud!");
//                 return;
//             }

//             try {
//                 const response = await fetch('/signup', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ username, password, email }),
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     alert(data.message);
//                     window.location.href = './index.html';
//                 } else {
//                     alert(data.error);
//                 }
//             } catch (error) {
//                 console.error('Xato:', error);
//                 alert('Server bilan bog\'lanishda xatolik yuz berdi');
//             }
//         });
//     }
// });
//----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;
            const confirmPassword = document.querySelector("#confirmPassword").value;
            const email = document.querySelector("#email").value;

            if (confirmPassword !== password) {
                alert("Kiritilgan parol bir xil emas!");
                return;
            }

            const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
            if (!usernamePattern.test(username)) {
                alert("Foydalanuvchi nomida xatolik mavjud!");
                return;
            }

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, email }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!");
                    window.location.href = '../index.html';
                } else {
                    alert(data.error || "Ro'yxatdan o'tishda xatolik yuz berdi");
                }
            } catch (error) {
                console.error('Xato:', error);
                alert('Server bilan bog\'lanishda xatolik yuz berdi');
            }
        });
    }
});

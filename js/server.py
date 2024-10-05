from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import re

app = Flask(__name__)
CORS(app)

def create_db():
    with sqlite3.connect('back_seat.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        ''')
        conn.commit()

def validate_input(username, email, password):
    username_pattern = re.compile(r'^[a-zA-Z0-9]{3,}$')
    email_pattern = re.compile(r'^[^@]+@[^@]+\.[^@]+$')
    
    if not username_pattern.match(username):
        return False, "Invalid username format."
    if not email_pattern.match(email):
        return False, "Invalid email format."
    if len(password) < 8:
        return False, "Password must be at least 8 characters."
    return True, ""

@app.route('/api/sign_up', methods=['POST'])
def sign_up():
    data = request.get_json()
    username, password, email = data.get('username'), data.get('password'), data.get('email')
    
    if not all([username, password, email]):
        return jsonify({"error": "All fields are required."}), 400

    is_valid, error_message = validate_input(username, email, password)
    if not is_valid:
        return jsonify({"error": error_message}), 400

    hashed_password = generate_password_hash(password)

    try:
        with sqlite3.connect('back_seat.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
                           (username, hashed_password, email))
            conn.commit() 
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/sign_in', methods=['POST'])
def sign_in():
    data = request.get_json()
    username, password = data.get('username'), data.get('password')

    if not all([username, password]):
        return jsonify({"error": "All fields are required."}), 400

    with sqlite3.connect('back_seat.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT password FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()

    if user and check_password_hash(user[0], password):
        return jsonify({"message": "Sign in successful!"}), 200
    else:
        return jsonify({"error": "Invalid username or password."}), 401


    
    

if __name__ == '__main__':
    create_db()
    app.run(debug=True, port=5001)

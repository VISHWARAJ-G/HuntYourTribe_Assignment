from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password=os.getenv("DB_PASSWORD"),
    database="notification_system",
    auth_plugin='mysql_native_password'
)
cursor = conn.cursor(dictionary=True)

@app.route('/')
def home():
    return "Flask is running perfectly"

@app.route('/notifications')
def get_notifications():
    cursor.execute("SELECT * FROM notification_table ORDER BY created_at DESC")
    notifications = cursor.fetchall()
    return jsonify(notifications)

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify
from flask_cors import CORS
import pymysql
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
conn = pymysql.connect(
    host="localhost",
    user="root",
    password=os.getenv("DB_PASSWORD"),
    database="notification_system"
)
cursor = conn.cursor(pymysql.cursors.DictCursor)

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
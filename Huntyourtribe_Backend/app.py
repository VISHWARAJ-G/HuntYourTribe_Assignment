from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password=os.getenv("DB_PASSWORD"),
        database="notification_system",
        cursorclass=pymysql.cursors.DictCursor
    )


@app.route('/')
def home():
    return "Flask is running perfectly"


@app.route('/notifications')
def get_notifications():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 5))
        offset = (page - 1) * limit

        cursor.execute("SELECT * FROM notification_table ORDER BY created_at DESC LIMIT %s OFFSET %s", (limit, offset))
        notifications = cursor.fetchall()

        cursor.close()
        conn.close()
        return jsonify(notifications), 200
    except Exception as e:
        print("Error occurred in fetchData:", str(e))
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/notifications/<int:notification_id>/read', methods=['PUT'])
def mark_as_read(notification_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("UPDATE notification_table SET is_read = 1 WHERE id = %s", (notification_id,))
        conn.commit()

        cursor.close()
        conn.close()
        return jsonify({"message": "Notification marked as read"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/notifications/<int:notification_id>', methods=['DELETE'])
def delete_notification(notification_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM notification_table WHERE id = %s", (notification_id,))
        conn.commit()

        cursor.close()
        conn.close()
        return jsonify({"message": "Notification deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/notifications/read-all', methods=['PUT'])
def mark_all_as_read():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE notification_table SET is_read = 1")
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "All notifications marked as read"}), 200

if __name__ == '__main__':
    app.run(debug=True)

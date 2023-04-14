from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_cors import CORS
from flaskext.mysql import MySQL
#import hashlib


mysql = MySQL()
app = Flask(__name__)
CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'passwd'
app.config['MYSQL_DATABASE_DB'] = 'adiary'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.secret_key = "ABCDEFG"
mysql.init_app(app)

# 시작 페이지
@app.route('/')
def main():
    return render_template('Default.jsx', error=None)

# 회원가입 기능
@app.route('/signin', methods = ['POST'])
def signin():
    params=request.get_json()
    error = None
    if request.method == 'POST':
        username = params['username']
        id = params['id']
        pw = params['pw']
        email = params['email']
        #pw_hash = hashlib.sha256(pw.encode('utf-8')).hexdigest()
        print('username : ',username, ' id : ',id, ' pw : ', pw, ' email : ', email)

        # 아이디 중복 확인
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user WHERE id = %s", (id))
        result = cursor.fetchone()

        if result > 0:
            return "중복된 아이디"
        
        # 사용자 정보 추가
        cursor.execute("INSERT INTO user(username, id, pw, email) VALUES (%s, %s, %s, %s)", (username, id, pw, email))
        conn.commit()
        
        cursor.close()
        conn.close()
    
    # 페이지 return 수정해야함
    return "success"

# 로그인 기능
@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        params=request.get_json()
        id = params['id']
        pw = params['pw']

        conn = mysql.connect()
        cursor = conn.cursor()

        sql = "SELECT * FROM user WHERE id = %s and pw = %s"
        rows_count = cursor.execute(sql, (id, pw))

        if rows_count > 0:
            user_info = cursor.fetchone()
            print("user info:", user_info)

            is_pw_correct = user_info[2]
            print("password check:", is_pw_correct)
            
            # 페이지 return 수정해야함
            return "OK"
        else:
            print("user doesn't exist")
            
            # 페이지 return 수정해야함
            return "fail"

# 로그아웃 기능
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main'))




    
if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)
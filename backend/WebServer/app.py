from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_cors import CORS
from flaskext.mysql import MySQL
import base64
# from datetime import datetime

mysql = MySQL()
app = Flask(__name__)
CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'passwd'
app.config['MYSQL_DATABASE_DB'] = 'a-diary'
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
        
        print('username : ',username, ' id : ',id, ' pw : ', pw, ' email : ', email)

        conn = mysql.connect()
        cursor = conn.cursor()
        
        # 사용자 정보 추가
        cursor.execute("INSERT INTO user(username, id, pw, email) VALUES (%s, %s, %s, %s)", (username, id, pw, email))
        conn.commit()
        
        cursor.close()
        conn.close()
    
    return "success"

# 아이디 중복 확인
@app.route('/idcheck', methods = ['POST'])
def id_check():
    if request.method == 'POST':
        params=request.get_json()
        error = None
        id = params['id']
        
        conn = mysql.connect()
        cursor = conn.cursor()
        result = cursor.execute("SELECT * FROM user WHERE id = %s", (id))
        # cursor.close()

        if result > 0:
            return jsonify(message='이미 사용 중인 아이디입니다.')
        else:
            return jsonify(message='사용 가능한 아이디입니다.')


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
            print(user_info)
            # session['login']= user_info
            # print("user info:", user_info)
            
            # is_pw_correct = user_info[3]
            # print("passwd check:", is_pw_correct)

            
            return "success"
        else:
            
            return "fail" 

@app.route('/main')
def write():
    if 'login' in session:
        return redirect(url_for('main'))

@app.route('/write', methods=['POST'])
def save_diary():
    params = request.get_json()
    error = None
    if request.method == 'POST':
        userid = 1
        date = params['date']
        day = params['day']
        weather = params['weather']
        title = params['title']
        diary = params['diary']
        img = params['jpgUrl']
        mood = params['emotion']
        
        print('userid:', userid, 'weather: ',weather, 'title: ', title, 'diary: ', diary, 'day:', day)

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO user_diary(userid, title, mood, weather, diary, date, img, day) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (userid, title, mood, weather, diary, date[0]+'-'+date[1]+'-'+date[2], img, day))
        conn.commit()
            
        cursor.close()
        conn.close()

    return "success"

@app.route('/mypage', methods = ['POST'])
def my_page():
    if request.method == 'POST':
        conn = mysql.connect()
        cursor = conn.cursor()
        #id = session['login'][0]

        cursor.execute("SELECT * FROM user_diary WHERE userid = %s ORDER BY diarynum DESC", (1))
        rows = cursor.fetchall()
        print(rows)

        result = []
        for row in rows:
            diarynum = row[1]
            title = row[2]
            mood = row[3]
            weather = row[4]
            diary = row[5]
            date_str = row[6]
            createat_str = row[7]
            img = base64.b64encode(row[8]).decode('utf-8')
            day = row[9]

            # date = datetime.strptime(date_str, "%Y-%m-%d").date()
            # createat = datetime.strptime(createat_str, "%Y-%m-%d %H:%M:%S")

            result.append({
                "diarynum": diarynum,
                "title": title,
                "mood": mood,
                "weather": weather,
                "diary": diary,
                "date": date_str,
                "day":day,
                "createat": createat_str,
                "img": img
            })

        print('mypage', result)

    return jsonify(result)

# 로그아웃 기능
@app.route('/logout')
def logout():
    session.pop('login', None)
    return redirect(url_for('main'))




    
if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)
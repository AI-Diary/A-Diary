from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_cors import CORS
from flaskext.mysql import MySQL
from datetime import datetime
import base64

mysql = MySQL()
app = Flask(__name__)
CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'passwd'
app.config['MYSQL_DATABASE_DB'] = 'a-diary'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
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

        sql = "SELECT userid FROM user WHERE id = %s and pw = %s"
        rows_count = cursor.execute(sql, (id, pw))

        if rows_count > 0:
            user_info = cursor.fetchone()
            print(user_info)
            session['login']= user_info
            return redirect(url_for('index'))
            
        else:
            
            return "fail" 

# 세션 따로 저장
@app.route('/main')
def index():
    if 'login' in session:
        print("세션 저장:", session[login])
    return "success"

# 일기 저장
@app.route('/write', methods = ['POST'])
def save_diary():
    params = request.get_json()
    error = None
    if request.method == 'POST':
        userid = params['userid']
        date = params['date']
        day = params['day']
        weather = params['weather']
        title = params['title']
        diary = params['diary']
        img = params['jpgUrl']
        mood = params['emotion']
        
        print('userid:', userid, 'weather: ',weather, 'title: ', title, 'diary: ', diary)

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO user_diary(userid, title, mood, weather, diary, date, img, day) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", 
                       (userid, title, mood, weather, diary, date[0]+'-'+date[1]+'-'+date[2], img, day))

        conn.commit()
            
        cursor.close()
        conn.close()

    return "success"

# 저장된 일기 확인
@app.route('/mypage', methods = ['POST'])
def my_page():
    if request.method == 'POST':
        params = request.get_json()
        userid = params['userid']
        conn = mysql.connect()
        cursor = conn.cursor()
        # id = session['login'][0]
        
        cursor.execute("SELECT CONVERT(img USING euckr) FROM user_diary WHERE userid=%s", (userid))
        images = cursor.fetchall()
        # for image in images:
            # print(image)

        cursor.execute("SELECT CONVERT(img USING euckr) FROM user_diary WHERE userid=%s", (userid))
        images = cursor.fetchall()

        cursor.execute("SELECT * FROM user_diary WHERE userid = %s ORDER BY diarynum DESC", (userid))
        rows = cursor.fetchall()
        # print(rows)

        result = []
        for row in rows:
            diarynum = row[1]
            title = row[2]
            mood = row[3]
            weather = row[4]
            diary = row[5]
            date_str = row[6]
            createat_str = row[7]
            img = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMzFfMjg4%2FMDAxNjgwMjQyNDk3NjQ1.1kiGUNgdBc0LoEMQTxGhH2KDBFu65OPtZMuBABKYmJ0g.gTfZNOC5_loP_dfvvqHXrCpKo5X6CK8ORdR1Pg9xE2Qg.JPEG.commab%2F4%25BF%25F9_%25B9%25D9%25C5%25C1%25C8%25AD%25B8%25E9.jpg&type=a340'
            day = row[9]

            result.append({
                "diarynum": diarynum,
                "title": title,
                "mood": mood,
                "weather": weather,
                "diary": diary,
                "date": date_str,
                "createat": createat_str,
                "img": img,
                "day": day,
            })
    
    return jsonify(result)

# 달력에 일기, 감정 표시
@app.route('/main_page', methods = ['POST'])
def main_page():

    result=[]

    params = request.get_json()
    userid = params['userid']
    conn = mysql.connect()
    cursor = conn.cursor()
    print(userid)

    cursor.execute("SELECT date, mood FROM user_diary WHERE userid = %s ORDER BY diarynum DESC" , (userid))
    rows = cursor.fetchall()

    print(rows)
    
    for row in rows:
        result.append({
            'date':row[0],
            'mood':row[1]
        })
    
    return jsonify(result)

# 일기 삭제
@app.route('/delete', methods = ['POST'])
def delete(diarynumber):
    params = request.get_json()
    error=None
    if request.method == 'POST':
        diarynumber=params["diarynum"]
        
        print("diarynum: ", diarynumber)

        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user_diary WHERE diarynum = %s",(diarynumber))
        conn.commit()
            
        cursor.close()
        conn.close()

    return "success"

# 일기, 감정 통계
@app.route('/cal', methods = ['POST'])
def mood():
    params = request.get_json()
    userid = params["userid"]

    if request.method == 'POST':
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT (mood, date) FROM user_diary WHERE userid = %s", (userid))
        print(userid)

        rows = cursor.fetchall()
        print(rows)

        result = []
        for row in rows:
            mood = row[1]
            date = row[2]

            result.append({
                'mood':mood - 30,
                'date':date - 30
            })

            print(result)
    
    return jsonify(result)


# 로그아웃 기능
@app.route('/logout')
def logout():
    session.pop('login', None)
    return redirect(url_for('main'))


if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)
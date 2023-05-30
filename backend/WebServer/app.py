from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_cors import CORS
from flaskext.mysql import MySQL
from datetime import datetime
import base64

mysql = MySQL()
app = Flask(__name__)
CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'A-Diary'
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

        # sql = "SELECT * FROM user WHERE id = %s and pw = %s"
        # rows_count = cursor.execute(sql, (id, pw))

        sql = "SELECT userid FROM user WHERE id = %s and pw = %s"
        rows_count = cursor.execute(sql, (id, pw))

        if rows_count > 0:
            user_info = cursor.fetchone()
            print(user_info)
            # session['login']= user_info
            # print("user info:", user_info[0])
            
            # is_pw_correct = user_info[3]
            # print("passwd check:", is_pw_correct)

            info = user_info[0]
            return jsonify(info)
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
        
        print('userid:', userid, 'weather: ',weather, 'title: ', title, 'diary: ', diary, 'date: ', date, 'day: ',day, 'mood:', mood, 'img: ',img)

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
        params = request.get_json()
        userid = params['userid']
        conn = mysql.connect()
        cursor = conn.cursor()
        # id = session['login'][0]
        
        cursor.execute("SELECT CONVERT(img USING euckr) FROM user_diary WHERE userid=%s", (userid))
        images = cursor.fetchall()
        # for image in images:
            # print(image)

        # print(images)

        cursor.execute("SELECT * FROM user_diary WHERE userid = %s ORDER BY diarynum DESC" , (userid))
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
            # img = base64.b64encode(row[8]).decode('utf-8')
            # img = base64.b64encode(img).decode('utf-8') 
            day = row[9]

            # date = datetime.strptime(date_str, "%Y-%m-%d").date()
            # createat = datetime.strptime(createat_str, "%Y-%m-%d %H:%M:%S")

            # print("img : ", img)

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
    

        # print('mypage', result)
    # for i in range(len(result)):
    #     print('result : ',result[i])
    #     result['img']=images
    return jsonify(result)

@app.route('/main_page', methods = ['POST'])
def main_page():

    result=[]

    params = request.get_json()
    userid = params['userid']
    conn = mysql.connect()
    cursor = conn.cursor()
    print(userid)

    cursor.execute("SELECT date FROM user_diary WHERE userid = %s ORDER BY diarynum DESC" , (userid))
    rows = cursor.fetchall()

    print(rows)
    
    for row in rows:
        result.append({
            'date':row[0]
        })
    
    return jsonify(result)

# 로그아웃 기능
@app.route('/logout')
def logout():
    session.pop('login', None)
    return redirect(url_for('main'))




    
if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)
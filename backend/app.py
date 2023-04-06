from flask import Flask, render_template, request, session, redirect, url_for
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'passwd'
app.config['MYSQL_DATABASE_DB'] = 'user_info'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.secret_key = "ABCDEFG"
mysql.init_app(app)

@app.route('/')
def main():
    return render_template('../frontend/src/Pages/Default.jsx', error=None)

@app.route('/signin', methods = ['POST'])
def signin():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        id = request.form['id']
        pw = request.form['pw']
        email = request.form['email']

        conn = mysql.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO users VALUES ('%s', '%s', '%s', '%s')" % (username, id, pw, email)
        cursor.execute(sql)
        
        data = cursor.fetchall()

        if not data:
            conn.commit()
            return redirect(url_for('main'))
        else:
            conn.rollback()
            return "회원가입 실패"
        
        cursor.close()
        conn.close()
    return render_template('Login.jsx', error=error)


@app.route('/login', methods = ['POST'])
def login():
    id = request.form['id']
    pw = request.form['pw']
    msg = "id: %s, pw: %s" %id %pw
    return msg

if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)
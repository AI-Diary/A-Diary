from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def home():
    return 'This is Home!'

@app.route('/login', methods = ['POST'])
def post():
    id = request.form['id']
    pw = request.form['pw']
    msg = "id: %s, pw: %s" %id %pw
    return msg

if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)



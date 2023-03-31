from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'This is Home!'

@app.route('/login', methods = ['POST'])
def post():
    params = request.get_json()
    id = params['id']
    pw = params['pw']
    msg = "id: %s, pw: %s" %(id, pw)
    print(msg)
    return msg

if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)



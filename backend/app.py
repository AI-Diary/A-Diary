from flask import Flask, render_template, request
app = Flask(__name__)


from WordControl.Word import Word
# from WordControl.WordInspection import WordInspectoin



@app.route('/')
def home():
    return 'This is Home!'

@app.route('/login', methods = ['POST'])
def post():
    id = request.form['id']
    pw = request.form['pw']
    msg = "id: %s, pw: %s" %id %pw
    return msg

@app.route('/keyword')
def get_keyword():
    # text=request.form['text']
    text="나는 너무 행복해"
    # jpype.attachThreadToJVM()
    # print(numpy)
    # okt=Okt()
        #    okt=Okt()
    # list1=okt.nouns(text)
    word=Word(text)
    list1=word.list_word()
    # print(list1)
    return list1
    

if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)



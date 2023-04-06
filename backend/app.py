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
    text="나는 너무 행복해 말이 너무 많아 너는 그렇게 생각하니 나는 아무것도 하고 싶지 않아 그냥 쿠키가 너무나도 먹고싶어 쿠키는 맛있어 그냥 바나나를 먹을까"
    # jpype.attachThreadToJVM()
    # print(numpy)
    # okt=Okt()
        #    okt=Okt()
    # list1=okt.nouns(text)
    
    list2=[]
    word=Word(text)
    list1=word.list_word()
    
    return list1    

if __name__=='__main__':
    app.run('0.0.0.0',port=5000,debug=True)



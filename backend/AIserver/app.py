from flask import Flask, render_template, request, session, redirect, url_for
from WordControl.Word import Word
from WordControl.papago import Papago

app = Flask(__name__)


@app.route('/keyword')
def get_keyword():
    # text=request.form['text']
    text="나는 너무 행복해 말이 너무 많아 너는 그렇게 생각하니 나는 아무것도 하고 싶지 않아 그냥 쿠키가 너무나도 먹고싶어 쿠키는 맛있어 그냥 바나나를 먹을까"
    # okt=Okt()
    # list1=okt.nouns(text)
    
    word=Word(text)
    list1=word.list_word()
    # papago=Papago(list1)
    # list1=papago.papa()
    list1=word.Word_Translation(list1)
    return str(list1)

    
    
    
if __name__=='__main__':
    app.run('0.0.0.0',port=5001,debug=True)
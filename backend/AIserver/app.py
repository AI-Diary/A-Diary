from flask import Flask, render_template, request, session, redirect, url_for,jsonify
from flask_cors import CORS
from WordControl.Word import Word
from Kobert.Kobert import Kobert_predict
from DrawControl.draw import draw

# import json


app = Flask(__name__)
CORS(app)

@app.route('/keyword',methods=['POST'])
def get_keyword():
    params = request.get_json()
    text=params['text']
    # text="나는 너무 행복해 말이 너무 많아 너는 그렇게 생각하니 나는 아무것도 하고 싶지 않아 그냥 쿠키가 너무나도 먹고싶어 쿠키는 맛있어 그냥 바나나를 먹을까"
    
    # print(text)
    kp=Kobert_predict()
    # 감정분석
    emotion=kp.predict(text)[-1]
    
    word=Word(text)
    # 한글 쪼개는거
    Ko_word=word.list_word()
    
    #영어 변환
    En_word=word.Word_Translation(Ko_word)
    # print(En_word)
    
    #단어검열
    re_En_word=word.Word_inspection(En_word)
    # print(re_En_word)
    # print("Ko_word : ",Ko_word)
    # print("re_En_word : ",En_word)
    # print("sa",re_En_word)

    j=1
    #Kobert 추출값
    data={'emotion':emotion}
    data['word']=[]
    #json으로 보낼 데이터 정리 
    for i in range(len(En_word)):
        if En_word[i] in re_En_word:
            
            data['word'].append({'id':j, 'korea':Ko_word[i],'English':En_word[i]})
            j=j+1

    print(data)
    return jsonify(data)

@app.route('/drawpic',methods=['POST'])
def get_drawpic():
    #그림추출
    params = request.get_json()
    text=params['keyword']
    # text='cat'
    draw_pic=draw(text)
    base=draw_pic.im_b64()
    dj={'img':base}
    
    return jsonify(dj)
    
if __name__=='__main__':
    app.run('0.0.0.0',port=5001,debug=True)
    

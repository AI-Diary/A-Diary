import os
import sys
import urllib.request
import json



     
class Papago:


    def __init__(self,word):
        self._word=word
        self.client_id = "iMrYGOD09gBo3ERpJEJD" # 개발자센터에서 발급받은 Client ID 값
        self.client_secret = "yDZC2Z_pYJ" # 개발자센터에서 발급받은 Client Secret 값     
        self.source = 'ko' 
        self.target = 'en'
           
    
    def papa(self):
        encText = urllib.parse.quote(self._word)
        data = f'source={self.source}&target={self.target}&text=' + encText
 
        url = "https://openapi.naver.com/v1/papago/n2mt"
        # client_id = " "
        # client_secret = " "
 
        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id", self.client_id)
        request.add_header("X-Naver-Client-Secret", self.client_secret)
 
        response = urllib.request.urlopen(request, data=data.encode("utf-8"))
        rescode = response.getcode()
 
        if rescode == 200:
            response_body = response.read()
            decode = json.loads(response_body.decode('utf-8'))
            result = decode['message']['result']['translatedText']
            return(result)
        else:
            print('Error Code:' + str(rescode))               



if __name__=='__main__':
    list1=['강아지','나']
    
    list2=[]
    for i in list1:
        papa=Papago(i)   
             
        list2.append(papa.papa())
        
    print(list2)
    
    print(type(papa.papa()))
    
from konlpy.tag import Okt
from .WordInspection import WordInspectoin
from .papago import Papago

class Word(object):
    
    def __init__(self, list_words):
    
        self._list_word=list_words
        
    def list_word(self):
        
        okt=Okt()
        list1=okt.nouns(self._list_word)
        list1=list(set(list1))

        # print(list1)
        return (list1)
    
    def Word_inspection(self,list1):
        Wordinspenct=WordInspectoin(list1)    
        word_list=Wordinspenct.Word_Inspection()
        # 영어
        return word_list
    
    def Word_Translation(self,list1):
        
        list2=[]
        for i in list1:
           
            papa=Papago(i)   
             
            list2.append(papa.papa())
        
        return list2
             
                
        
if __name__=='__main__':

        
    text="나는 너무 강아지랑 있으니까 너무 행복해"
    # print(type(text))
    word=Word(text)
    words1=word.list_word()
    
    # words1=list(words1)
    print((words1))    
    # papa=Papago(text)
    # print(papa.papa())
    # words=['나','강아지']
    # if (words==words1):
        # print("true")
    words=word.Word_Translation(words1)
    print((words))
    # print(word.list_word)    
    # word.list_word()
    # okt=Okt()
    
    # print(type(okt.nouns(text)))
    # print(words)

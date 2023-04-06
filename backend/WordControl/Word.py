from konlpy.tag import Okt


class Word(object):
    
    def __init__(self, list_words):
    
        self._list_word=list_words
        
    def list_word(self):
        
        okt=Okt()
        list1=okt.nouns(self._list_word)
        
        return list1
        
if __name__=='__main__':
    text="나는 너무 강아지랑 있으니까 너무 행복해"
    print(type(text))
    word=Word(text)
    words=word.list_word()
    print(word.list_word)    
    # word.list_word()
    # okt=Okt()
    
    # print(type(okt.nouns(text)))
    print(words)

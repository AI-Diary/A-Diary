import jsonlines
from pathlib import Path

parentPath = Path(__file__).parent

class WordInspectoin(object):
    
    def __init__(self,list1):
         self.file='/categories.txt'
         self.file_matching='/label_matching.jsonl'
         self.__list_word=list1
    
    def Word_Inspection(self):
        list2=[]
        list3=[]
        with open(str(parentPath)+self.file,'r') as f:
            lines=f.readlines()
            for line in lines:
                line = line.strip()
                list2.append(line)
                # print ((line))
            # print(len(list2))
            
        for i in list2:
            for j in self.__list_word:
                if(i==j):
                    list3.append(i)        
            
        return list3  
    
    def Trans_Word_change(self,keyword):
            if keyword not in self.file :
                with jsonlines.open(str(parentPath)+self.file_matching, mode='r') as reader:
                    category_mapping = reader.read()
                if keyword in category_mapping.keys(): # 대체할 단어가 있을 때
                    keyword = category_mapping[keyword]
                    print("대체 키워드", keyword)
                    return keyword
                else : #keyword가 아예 존재하지 않을 때
                    return str("단어가 없습니다")
            else:
               return keyword
            
if __name__=='__main__':
    list1 =['cat','b']
    word=WordInspectoin(list1)
    
    print(word.Word_Inspection())
    print(word.Trans_Word_change("yacht"))
    
    

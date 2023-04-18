import jsonlines
from pathlib import Path

parentPath = Path(__file__).parent

class WordInspectoin(object):
    
    def __init__(self):
         self.file='/categories.txt'
         self.file_matching='/label_matching.jsonl'
         
    
    def Word_Inspection(self,list1):
        list2=[]
        list3=[]
        self.__list_word=list1
        with open(str(parentPath)+self.file,'r') as f:
            lines=f.readlines()
            for line in lines:
                line = line.strip()
                list2.append(line)
                # print ((line))
            # print(len(list2))
        for i in range(len(self.__list_word)):
            self.__list_word[i]=self.__list_word[i].replace("the ","").strip(".")
            self.__list_word[i]=self.__list_word[i].replace("a ","").strip(".")
        # for i in list2:
        # print(list4)
        for j in self.__list_word:
            if j in list2:
                # if(i==j):
                list3.append(j)
            else:
                word=self.Trans_Word_change(j)
                if(word!=False):
                    list3.append(word)                

        return list3  
    
    def Trans_Word_change(self,keyword):
            if keyword not in self.file :
                with jsonlines.open(str(parentPath)+self.file_matching, mode='r') as reader:
                    category_mapping = reader.read()
                if keyword in category_mapping.keys(): # 대체할 단어가 있을 때
                    keyword = category_mapping[keyword]
                    print("대체 키워드", keyword)
                    return keyword
                else:
                    return False
            else:
                return False
                        
if __name__=='__main__':
    list1 =['the cat','b','yacht']
    word=WordInspectoin()
    # list1[0]=list1[0].replace("the ","")
    # print(list1[0])
    print(word.Word_Inspection(list1))
    # print(word.Trans_Word_change("yacht"))
    
    

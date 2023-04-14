class WordInspectoin(object):
    
    def __init__(self,list1):
         self.file='categories.txt'
         self.__list_word=list1
    
    def Word_Inspection(self):
        list2=[]
        list3=[]
        with open(self.file,'r') as f:
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
    
             
# if __name__=='__main__':
#     list1 =['cat','b']
#     word=WordInspectoin(list1)
    
#     print(word.Word_Inspection())
    

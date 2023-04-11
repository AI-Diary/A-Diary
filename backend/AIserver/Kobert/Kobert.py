# torch
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook
from pathlib import Path
from .Kobert_model import BERTClassifier,BERTDataset

#kobert
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model

#GPU 사용
device = torch.device("cpu")

#BERT 모델, Vocabulary 불러오기 필수
bertmodel, vocab = get_pytorch_kobert_model()


# KoBERT에 입력될 데이터셋 정리


# Setting parameters
max_len = 64
batch_size = 32
warmup_ratio = 0.1
num_epochs = 20
max_grad_norm = 1
log_interval = 100
learning_rate =  5e-5

## 학습 모델 로드
parentPath = Path(__file__).parent


model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)

model.load_state_dict(torch.load(str(parentPath)+"\SentimentAnalysisKOBert_StateDict.pt", map_location='cpu'))  # state_dict를 불러 온 후, 모델에 저장
# model = torch.load(str(parentPath)+"\SentimentAnalysisKOBert.pt", map_location='cpu')  # 전체 모델을 통째로 불러옴, 클래스 선언 필수
# model.load_state_dict(torch.load(str(parentPath)+"\SentimentAnalysisKOBert_StateDict.pt", map_location='cpu'))  # state_dict를 불러 온 후, 모델에 저장

#토큰화
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)
class Kobert_predict:
    def new_softmax(self,a) : 
        c = np.max(a) # 최댓값
        exp_a = np.exp(a-c) # 각각의 원소에 최댓값을 뺀 값에 exp를 취한다. (이를 통해 overflow 방지)
        sum_exp_a = np.sum(exp_a)
        y = (exp_a / sum_exp_a) * 100
        return np.round(y, 3)


    # 예측 모델 설정
    def predict(self,predict_sentence):

        data = [predict_sentence, '0']
        dataset_another = [data]

        another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
        test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=0)
        
        model.eval()

        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
            token_ids = token_ids.long().to(device)
            segment_ids = segment_ids.long().to(device)

            valid_length= valid_length
            label = label.long().to(device)

            out = model(token_ids, valid_length, segment_ids)

            test_eval=[]
            for i in out:
                logits=i
                logits = logits.detach().cpu().numpy()
                min_v = min(logits)
                total = 0
                probability = []
                logits = np.round(self.new_softmax(logits), 3).tolist()
                for logit in logits:
                    print(logit)
                    probability.append(np.round(logit, 3))

                if np.argmax(logits) == 0:  emotion = "기쁨"
                elif np.argmax(logits) == 1: emotion = "불안"
                elif np.argmax(logits) == 2: emotion = '당황'
                elif np.argmax(logits) == 3: emotion = '슬픔'
                elif np.argmax(logits) == 4: emotion = '분노'
                elif np.argmax(logits) == 5: emotion = '상처'

                probability.append(emotion)
                print(probability)
        return probability

if __name__=='__main__':
    
    text="나는 너무 행복해"
    kp=Kobert_predict()
    
    kp.predict(text)
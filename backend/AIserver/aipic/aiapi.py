import requests

class get_aipic:
    def __init__(self, data):
        self.data = data
        self.url="https://9d718472494836910c.gradio.live/run/predict"
        self.keyword=['golden color, high quality,highly detailed, elegant, sharp focus, cute magical, fantasy art, concept art, character concepts, digital painting,mystery, adventure']
    
    def get_pic(self):
        print(self.data)
        self.data['data']+=self.keyword
        print(self.data)
        result = ','.join(self.data['data'])
        result={'data':[result]}
        print(result)
        response=requests.post(self.url, json=result)
        print(response)
        # return True
        return response.json()['data'][0].replace('data:image/png;base64,', '')
        # return response.json()['data'][0]
        # return self.data

if __name__=='__main__':
    
    # get=get_aipic({"data":["cookie"]})  
    data={"data":["cookies"]}
    print(type(data))
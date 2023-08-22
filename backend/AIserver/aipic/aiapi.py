import requests

class get_aipic:
    def __init__(self, data):
        self.data = data
        self.url="https://bebaa0b7a426991791.gradio.live/run/predict"
        
    
    def get_pic(self):
        print(self.data)
        # data=
        response=requests.post(self.url, json=self.data)
        print(response)
        # return True
        return response.json()['data'][0].replace('data:image/png;base64,', '')
        # return self.data

if __name__=='__main__':
    
    # get=get_aipic({"data":["cookie"]})  
    data={"data":["cookies"]}
    print(type(data))
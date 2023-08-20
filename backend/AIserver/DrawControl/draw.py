import base64
from io import BytesIO
from PIL import Image
from quickdraw import QuickDrawData

class draw(object):
    def __init__(self, text):
        self.text = text
        
    def drawing(self):
        qd = QuickDrawData(recognized=None)
        img = qd.get_drawing(self.text)
        self.img = img
        
        
        return img.image
    
    # image to base64 
    def im_b64(self):
        img = self.drawing()
        im_file = BytesIO()
        img.save(im_file, format="JPEG")
        im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
        b64 = base64.b64encode(im_bytes).decode('utf8')
        self.b64 = b64
        
        return b64
    
    # base64 to image
    def b64_im(self,base):
        b64 = base
        im_bytes = base64.b64decode(b64)
        im_file = BytesIO(im_bytes)
        img = Image.open(im_file)
        return img
    
if __name__=='__main__':
    d = draw('cookie')
    img = d.im_b64()
    # d.show()
    # print((d))
    # dj={'img':img}
    # print(type(dj))
    d.b64_im(img).show()
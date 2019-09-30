from flask import Flask, render_template, request
from werkzeug import secure_filename
import os
import sys
from PIL import Image
import pytesseract
import argparse
import cv2

app = Flask(__name__)
UPLOAD_FOLDER = './static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

@app.route('/', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      filename = secure_filename(f.filename)
      filepath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
      f.save(filepath)
      image = cv2.imread(filepath)
      gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
      gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
      gray = cv2.medianBlur(gray, 3)
      ofilename = os.path.join(app.config['UPLOAD_FOLDER'],"{}.png".format(os.getpid()))
      cv2.imwrite(ofilename, gray)
      text = pytesseract.image_to_string(Image.open(ofilename))
      os.remove(ofilename)
      return text

if __name__ == '__main__':
   app.run(host="0.0.0.0", port=5000, debug=True)

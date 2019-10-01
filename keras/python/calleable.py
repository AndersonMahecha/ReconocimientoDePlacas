import os
from flask import Flask, request
from werkzeug import secure_filename
import sys
from PIL import Image
import pytesseract
import cv2
import processing as proc

modelPath = os.environ.get('MODEL_PATH')
checkPointPath = os.environ.get('CHECK_POINTS_PATH')
model = False

app = Flask(__name__)
UPLOAD_FOLDER = '.'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)
        texto, auto, placa = proc.getPrediction(model, filepath)
        os.remove(filepath)
        return texto


if __name__ == '__main__':
    model = proc.loadModel(checkPointPath, modelPath)
    app.run(host="0.0.0.0", port=8080, debug=True)

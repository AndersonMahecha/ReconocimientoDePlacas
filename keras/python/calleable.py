import queue
import os
import pymysql

from flask import Flask, request, make_response, jsonify

import procesamiento as pro
import takephoto as tk

db = pymysql.connect("mysql", "root", "pass", "mydb")

app = Flask(__name__)

port = os.getenv("", "value does not exist")

image_queue = queue.Queue()
check_point_path = "../model/checkPoint"
detector = pro.Detector(image_queue, check_point_path, db )

reques_queue = queue.Queue()
taker = tk.Camera(reques_queue, image_queue, db)




@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        id = request.values["path"]
        image_queue.put(id)
    data = {'message': 'Created', 'code': 'SUCCESS'}
    return make_response(jsonify(data), 200)


@app.route('/takephoto', methods=['POST'])
def takephoto():
    if request.method == 'POST':
        id = request.values["id"]
        reques_queue.put(id)
    data = {'message': 'Created', 'code': 'SUCCESS'}
    return make_response(jsonify(data), 200)


@app.route('/estacion', methods=['POST'])
def estacion():
    if request.method == 'POST':
        id = request.values["id"]
        estado = request.values["estado"]

    data = {'message': 'Created', 'code': 'SUCCESS'}
    return make_response(jsonify(data), 200)


if __name__ == '__main__':
    if not detector.is_alive():
        detector.start()
    if not taker.is_alive():
        taker.start()
    app.run(host="0.0.0.0", port=5001, debug=False)

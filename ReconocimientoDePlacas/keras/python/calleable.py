from flask import Flask, request, make_response, jsonify
from werkzeug.wrappers import json
import procesamiento as pro
import queue

app = Flask(__name__)

image_queue = queue.Queue()
check_point_path = "../model/checkPoint"
detector = pro.Detector(image_queue, check_point_path)

@app.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        id = request.values["id"]
        image_queue.put(id)
    data = {'message': 'Created', 'code': 'SUCCESS'}
    return make_response(jsonify(data), 200)


if __name__ == '__main__':
    detector.start()
    app.run(host="0.0.0.0", port=5001, debug=False)

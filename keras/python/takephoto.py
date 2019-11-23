import datetime
import queue
import threading
import urllib.request

import cv2 as cv
import numpy as np


class Camera(threading.Thread):
    FORMAT = 'http://{}:{}/shot.jpg'
    NAME_FORMAT = "./../files/image{}.png"

    def __init__(self, request_queue: queue, proces_queue: queue, db):
        threading.Thread.__init__(self)
        self.proccess_queue = proces_queue
        self.request_queue = request_queue
        self.db = db

    def run(self):
        while True:
            camera_id = self.request_queue.get()
            sql = 'SELECT ip, port FROM devices_ip WHERE id = {}'.format(camera_id)
            cursor = self.db.cursor()
            cursor.execute(sql)
            result = cursor.fetchone()
            url = self.FORMAT.format(result[0], result[1])
            img_resp = urllib.request.urlopen(url)
            img_np = np.array(bytearray(img_resp.read()), dtype=np.uint8)
            img = cv.imdecode(img_np, -1)
            file_name = self.NAME_FORMAT.format(datetime.datetime.now().time())
            cv.imwrite(file_name, img)
            self.proccess_queue.put(file_name)

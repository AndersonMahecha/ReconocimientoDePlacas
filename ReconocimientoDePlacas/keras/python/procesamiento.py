import os as os
import re
import threading
import pymysql
from typing import List

import cv2 as cv2
import keras_segmentation
import numpy as np
import pytesseract
import tensorflow as tf
from PIL import Image
from keras import backend as K
from keras.backend.tensorflow_backend import set_session
from numpy.core._multiarray_umath import ndarray


class Detector(threading.Thread):
    config = tf.ConfigProto()
    config.gpu_options.allow_growth = True
    config.log_device_placement = False
    sess = tf.Session(config=config)
    set_session(sess)
    db = pymysql.connect("localhost", "root", "pass", "mydb")

    def __init__(self, image_queues, check_point_path, automovile=True):
        threading.Thread.__init__(self)
        self.automovile = automovile
        self.image_queue = image_queues
        self.check_point_path = check_point_path
        self.salida = "temp"
        self.salida_prediccion = self.salida + "/out.jpeg"
        self.salida_placa = self.salida + "/recortada.png"
        self.salida_BN = self.salida + "/placa.png"
        self.model = keras_segmentation.predict.model_from_checkpoint_path(checkpoints_path=self.check_point_path)
        self.model._make_predict_function()
        self.session = K.get_session()
        self.graph = tf.get_default_graph()
        self.graph.finalize()

    def run(self):
        while True:
            img_path = self.image_queue.get()
            sql = "SELECT file_path FROM vehiculo_registros WHERE idvehiculo_registro = {} ".format(img_path)
            cursor = self.db.cursor()
            cursor.execute(sql)
            result = cursor.fetchone()
            if result:
                text, im1, im2 = self.get_prediction(result[0])
                print("placa: {} imagen: {}".format(text, result[0]))

    def get_prediction(self, image_path):
        if not os.path.isdir(self.salida):
            os.mkdir(self.salida)

        original = cv2.imread(image_path)
        with self.session.as_default():
            with self.graph.as_default():
                self.model.predict_segmentation(
                    inp=image_path,
                    out_fname=self.salida_prediccion
                )

        img = cv2.imread(self.salida_prediccion)

        rg_b = np.matrix(img[:, :, 0])
        r_gb = np.matrix(img[:, :, 1])

        img = cv2.absdiff(r_gb, rg_b)

        _, img = cv2.threshold(img, 80, 255, cv2.THRESH_BINARY)

        se = np.ones((5, 5), np.uint8)
        se2 = np.ones((5, 5), np.uint8)
        closing = cv2.morphologyEx(img, cv2.MORPH_CLOSE, se)
        dilation = cv2.dilate(closing, se2, 1)
        a, contours, hierarchy = cv2.findContours(
            dilation, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        cnt = contours[:]
        num = len(cnt)
        box = np.zeros((num, 4))

        for i in range(0, num):
            box[i, :] = cv2.boundingRect(cnt[i])
            l: ndarray = np.zeros((num, 4))
            max_bon: List[int] = [0, 0]
            for i in range(0, num):
                l[i, :] = box[i]
                if l[i, 2] > max_bon[1]:
                    max_bon = [i, l[i, 2]]
        box = box[max_bon[0], :]
        box = np.array(box, dtype=np.uint32)
        recortada = original[box[1]:box[1] + box[3], box[0]:box[0] + box[2], :].copy()
        cv2.rectangle(original, (box[0], box[1]),
                      (box[0] + box[2], box[1] + box[3]), (255, 0, 0), 2)

        gray = cv2.cvtColor(recortada, cv2.COLOR_BGR2GRAY)

        text, gray = self.try_to_decode(gray)

        cv2.imwrite((self.salida + "/" + self.validate_placa(text) + "-" + image_path[15:-3] + "png"), gray)

        os.remove(self.salida_BN)
        os.remove(self.salida_prediccion)

        return text, original, recortada

    def try_to_decode(self, gray):
        text, gray = self.binary_a(gray)
        if not text:
            text, gray = self.binary_b(gray)
        return text, gray

    def binary_b(self, img):
        gray = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 61, 25)
        gray = cv2.medianBlur(gray, 3)
        gray = self.make_border(gray)
        cv2.imwrite(self.salida_BN, gray)
        text = pytesseract.image_to_string(Image.open(self.salida_BN))
        return text, gray

    def binary_a(self, img):
        gray = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        gray = cv2.medianBlur(gray, 3)
        gray = self.make_border(gray)
        cv2.imwrite(self.salida_BN, gray)
        text = pytesseract.image_to_string(Image.open(self.salida_BN))
        return text, gray

    @staticmethod
    def make_border(img):
        [x, y] = img.shape
        img = img[int(x * 0.1):int(x * 0.7), int(y * 0.05):int(y * 0.95)]
        row, col = img.shape[:2]
        bottom = img[row - 2:row, 0:col]
        mean = cv2.mean(bottom)[0]
        border_size = 50
        img = cv2.copyMakeBorder(
            img,
            top=border_size,
            bottom=border_size,
            left=border_size,
            right=border_size,
            borderType=cv2.BORDER_CONSTANT,
            value=[mean, mean, mean]
        )
        return img

    @staticmethod
    def validate_placa(placa: str):
        placa = re.sub(r'[^\w]', '', placa)
        placa = re.sub(r'[a-z]', '', placa)
        return placa

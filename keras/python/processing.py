import keras_segmentation
import cv2 as cv2
import matplotlib.pyplot as plt
from os import scandir, getcwd
import os as os
import numpy as np
from PIL import Image
import pytesseract
from keras.models import load_model
import json


salida = os.environ.get('EXIT_PATH')
salidaPrediccion = salida+"/out.jpeg"
salidaPlaca = salida+"/recortada.png"
salidaBN = salida+"/placa.png"


def loadModel(checkPointPath, modelPath):
    model = keras_segmentation.predict.model_from_checkpoint_path(
        checkpoints_path=checkPointPath)
    model.load_weights(modelPath)
    return model


def getPrediction(model, path):

    if not os.path.isdir(salida):
        os.mkdir(salida)

    original = plt.imread(fname=path)

    img = model.predict_segmentation(
        inp=path,
        out_fname=salidaPrediccion
    )

    img = cv2.imread(salidaPrediccion)

    rgB = np.matrix(img[:, :, 0])
    rGb = np.matrix(img[:, :, 1])

    img = cv2.absdiff(rGb, rgB)

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
        L = np.zeros((num, 4))
        Max = [0, 0]
        for i in range(0, num):
            L[i, :] = box[i]
            if L[i, 2] > Max[1]:
                Max = [i, L[i, 2]]
    BOX = box[Max[0], :]
    BOX = np.array(BOX, dtype=np.uint32)
    recortada = original[BOX[1]:BOX[1]+BOX[3], BOX[0]:BOX[0]+BOX[2], :].copy()
    cv2.rectangle(original, (BOX[0], BOX[1]),
                  (BOX[0]+BOX[2], BOX[1]+BOX[3]), (255, 0, 0), 2)

    cv2.imwrite(salidaPlaca, recortada*255)
    recortadaGray = cv2.imread(salidaPlaca, 0)

    recortadaGray = cv2.medianBlur(recortadaGray, 1)
    blackAndWhiteImage = cv2.adaptiveThreshold(
        recortadaGray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 7, 7)

    [x, y] = blackAndWhiteImage.shape
    blackAndWhiteImage = blackAndWhiteImage[int(
        x*0.15):int(x*0.7), int(y*0.07):int(y*0.9)]

    row, col = blackAndWhiteImage.shape[:2]
    bottom = blackAndWhiteImage[row-2:row, 0:col]
    mean = cv2.mean(bottom)[0]

    bordersize = 10
    blackAndWhiteImage = cv2.copyMakeBorder(
        blackAndWhiteImage,
        top=bordersize,
        bottom=bordersize,
        left=bordersize,
        right=bordersize,
        borderType=cv2.BORDER_CONSTANT,
        value=[mean, mean, mean]
    )

    cv2.imwrite(salidaBN, blackAndWhiteImage)
    text = pytesseract.image_to_string(Image.open(salidaBN))

    os.remove(salidaBN)
    os.remove(salidaPlaca)
    os.remove(salidaPrediccion)

    return text, original, recortada

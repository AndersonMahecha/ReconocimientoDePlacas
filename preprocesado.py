#!/usr/bin/env python
#preprocesado.py

import cv2 as cv2
import numpy as np
from os import scandir, getcwd
import os as os
import math as m
from PIL import Image
from matplotlib import pyplot as plt

def ls(ruta = getcwd()):
    return [arch.name for arch in scandir(ruta) if arch.is_file()]

#--Se carga el directorio de la imagen
directorio="prueba"
extension = ".jpg"
files = ls(directorio)
imageFiles = []
for f in files:
    ext = os.path.splitext(f)[1]
    if ext==extension:
        imageFiles.append(f)

for f in imageFiles:
    #--Se lee la imagen
    a=cv2.imread("./"+directorio+"/"+f)

    
    if a.shape[1]>720:
        scale_percent = a.shape[1]/720*100
    width = int(a.shape[1] * 100/scale_percent)
    height = int(a.shape[0] * 100/scale_percent)
    dim = (width, height)
    # resize image
    a = cv2.resize(a, dim, interpolation = cv2.INTER_AREA)

    #--Se sacan los canales de color
    rgB=np.matrix(a[:,:,0])
    rGb=np.matrix(a[:,:,1])
    Rgb=np.matrix(a[:,:,2])
    #--saca diferencia entre canales verde y azul, para dejar en escala de grises
    I=cv2.absdiff(rGb,rgB)
    #-- se convierte en blanco y negro
    [fil,col]=I.shape
    for o in range(0,fil):
        for oo in range(0,col):
            if I[o,oo]<50:
                I[o,oo]=0
            if I[o,oo]>0:
                I[o,oo]=1
    kernel = np.ones((5,5),np.uint8)                
    I = cv2.erode(I,kernel,iterations = 1)
    ##--Transformaciones
    se = np.ones((50,50),np.uint8)
    se2 = np.ones((10,10),np.uint8)
    closing = cv2.morphologyEx(I,cv2.MORPH_CLOSE,se) #Cierre
    dilation = cv2.dilate(closing,se2,1)

    ##-- encontrar contornos

    contours,hierachy = cv2.findContours(dilation,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    final_contours = []
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 1000 and area<4000:
            epsilon = 0.1*cv2.arcLength(contour,True)
            approx = cv2.approxPolyDP(contour,epsilon,True)
            cv2.drawContours(a,approx,-1,(0,255,0),3)
            x,y,w,h = cv2.boundingRect(approx)
            cv2.rectangle(a,(x,y),(x+w,y+h),(0,255,0),2)
            ##final_contours.append(contour)        
    
    cv2.imwrite("./salida/"+f,a)
    cv2.imwrite("./salida2/"+f,I*255)
    cv2.destroyAllWindows()
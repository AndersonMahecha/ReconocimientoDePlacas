#!/usr/bin/python3
import urllib
import urllib.request
import requests
import time
import csv
from bs4 import BeautifulSoup
from PIL import Image, ImageOps
path = "./placas/"
f= open(path+"omitidas","w+")
pathToPlacas = "Placas2.csv"
name = "image"
pos = 1000
startnumber= pos
start = 0
with open(pathToPlacas) as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        if row:
            if pos>=(startnumber+start):
                url = row[0]
                response = requests.get(url)
                soup = BeautifulSoup(response.text, "html.parser")
                try:
                    image = soup.find("meta",  property="og:image")["content"]  
                    img = Image.open(urllib.request.urlopen(image))
                    img.save(path+name+str(pos)+".jpeg")
                    print(path+name+str(pos)+".jpeg")
                    print(url)
                except:
                    f.write(path+name+str(pos)+".jpeg"+" "+ url)
            pos+=1
f.close

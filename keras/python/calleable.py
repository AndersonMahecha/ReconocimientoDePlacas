import os
import matplotlib.pyplot as plt
import processing as proc

modelPath = os.environ.get('MODEL_PATH')
checkPointPath = os.environ.get('CHECK_POINTS_PATH')

model = proc.loadModel(checkPointPath,modelPath)

texto , auto, placa = proc.getPrediction(model,"carro (2).png")
f= open("placa.txt","w+", encoding='utf-8')
f.write(texto)
f.close()
print(texto)


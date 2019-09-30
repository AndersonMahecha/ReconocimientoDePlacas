FROM ubuntu:latest
MAINTAINER Rick Torzynski "ricktorzynski@gmail.com"

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt update && apt install -y libsm6 libxext6
RUN apt-get -y install tesseract-ocr
RUN pip install pillow
RUN pip install pytesseract
RUN pip install opencv-contrib-python
RUN pip install certifi==2018.11.29
RUN pip install Click==7.0
RUN pip install Flask==1.0.2
RUN pip install gunicorn==19.9.0
RUN pip install itsdangerous==1.1.0
RUN pip install Jinja2==2.10.1
RUN pip install MarkupSafe==1.1.0
RUN pip install numpy
RUN pip install opencv-contrib-python
RUN pip install Pillow
RUN pip install pytesseract
RUN pip install werkzeug

COPY /ocr /app
WORKDIR /app

ENTRYPOINT ["python"]
CMD ["app.py"]
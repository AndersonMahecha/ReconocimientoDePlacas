# docker-keras - Keras in Docker with Python 3 and TensorFlow on GPU

FROM gw000/debian-cuda

# install debian packages
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -qq \
 && apt-get install --no-install-recommends -y \
    # install essentials
    build-essential \
    g++ \
    git \
    openssh-client \
    # install python 3
    python3 \
    python3-dev \
    python3-pip \
    python3-setuptools \
    python3-virtualenv \
    python3-wheel \
    pkg-config \
    # requirements for numpy
    libopenblas-base \
    python3-numpy \
    python3-scipy \
    # requirements for keras
    python3-h5py \
    python3-yaml \
    python3-pydot \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# manually update numpy
RUN pip3 install --upgrade pip
RUN pip3 --no-cache-dir install -U numpy==1.13.3

ARG TENSORFLOW_VERSION=1.7.0
ARG TENSORFLOW_DEVICE=gpu
ARG TENSORFLOW_APPEND=_gpu
RUN pip3 --no-cache-dir install https://storage.googleapis.com/tensorflow/linux/${TENSORFLOW_DEVICE}/tensorflow${TENSORFLOW_APPEND}-${TENSORFLOW_VERSION}-cp35-cp35m-linux_x86_64.whl

ARG KERAS_VERSION=2.1.4
ENV KERAS_BACKEND=tensorflow
RUN pip3 --no-cache-dir install --no-dependencies git+https://github.com/fchollet/keras.git@${KERAS_VERSION}


RUN pip3 install pillow \
   certifi==2018.11.29 \
   Click==7.0 \
   Flask==1.0.2 \
   gunicorn==19.9.0 \
   itsdangerous==1.1.0 \
   Jinja2==2.10.1 \
   MarkupSafe==1.1.0 \
   numpy \
   opencv-contrib-python \
   Pillow \
   pytesseract \
   werkzeug \
   opencv-python==3.4.3.18 \
   tqdm \
   keras-segmentation \
   matplotlib \
   requests \
   pymysql

COPY vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5 root/.keras/datasets/
COPY /model ./srv/model
COPY /python ./srv/python

WORKDIR /srv/python
CMD [ "python3", "./calleable.py" ]
# docker-keras - Keras in Docker with Python 3 and Theano on CPU
#If CheckPoints Path Changes, change in the RUN COmmand
FROM debian:stretch
MAINTAINER gw0 [http://gw.tnode.com/] <gw.2018@ena.one>

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
    tesseract-ocr \
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


ARG THEANO_VERSION=1.0.1
ENV THEANO_FLAGS='device=cpu,floatX=float32'
RUN pip3 --no-cache-dir install git+https://github.com/Theano/Theano.git@rel-${THEANO_VERSION}

ARG KERAS_VERSION=2.1.4
ENV KERAS_BACKEND=theano
RUN pip3 --no-cache-dir install --no-dependencies git+https://github.com/fchollet/keras.git@${KERAS_VERSION}
RUN pip3 install opencv-python==3.4.3.18
RUN pip3 install tqdm
RUN pip3 install keras-segmentation
RUN pip3 install pytesseract
RUN pip3 install matplotlib
RUN pip3 install requests

# quick test and dump package lists
RUN python3 -c "import theano; print(theano.__version__)" \
 && dpkg-query -l > /dpkg-query-l.txt \
 && pip3 freeze > /pip3-freeze.txt

COPY vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5 root/.keras/datasets/
COPY /model ./srv/model
COPY /python ./srv/python

WORKDIR /srv/python

CMD [ "python3", "./calleable.py" ]
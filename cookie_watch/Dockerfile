# pull official base image
FROM python:3.10.7-slim-buster

# set work directory
WORKDIR /usr/cookie_watch

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/cookie_watch/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/cookie_watch/
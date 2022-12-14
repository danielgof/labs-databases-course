FROM python:3.9.1
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]


# FROM ubuntu:latest
# RUN apt-get update -y
# RUN apt-get install -y python-pip python3-dev build-essential
# COPY . /app
# WORKDIR /app 
# CMD ['pip3 install -r requirements.txt']
# ENTRYPOINT ['python']
# CMD ['app.py']
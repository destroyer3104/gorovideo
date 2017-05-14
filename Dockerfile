FROM gcr.io/google-appengine/python

RUN apt-get update
RUN apt-get install libav-tools -y

ADD . /app/
RUN pip install -r requirements.txt

CMD gunicorn -b :80 main:app
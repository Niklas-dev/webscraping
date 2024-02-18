FROM python:3.12
WORKDIR /backend
COPY backend/requirements.txt requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
COPY . /backend
CMD cd backend
EXPOSE 8000
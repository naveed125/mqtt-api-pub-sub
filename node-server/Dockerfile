FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install \
&&  npm install -g nodemon

COPY . .

EXPOSE 80

CMD [ "./start.sh" ]

FROM node:12
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install


COPY app2.js ./
COPY public public
COPY keycloak1.json ./
COPY app.js ./
COPY app.sh ./

EXPOSE 3000

CMD [ "sh", "./app.sh" ]


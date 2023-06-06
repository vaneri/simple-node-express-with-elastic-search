FROM node:18.12 

WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

RUN npm install

COPY src/ src/

RUN npm run build 

EXPOSE 3000
EXPOSE 9200

CMD npm start

FROM node:16
ENV NODE_ENV=development

WORKDIR /usr/src/tique

COPY . .

RUN npm install

CMD npm run dev
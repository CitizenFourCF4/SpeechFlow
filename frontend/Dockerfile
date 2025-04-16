FROM node:18-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

RUN yarn install

COPY . /app/frontend/

CMD ["yarn", "dev", "--host", "0.0.0.0"]

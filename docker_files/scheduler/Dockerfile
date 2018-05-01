FROM mhart/alpine-node:9

WORKDIR /app
COPY ./scheduler /app/scheduler
COPY ./package.json /app
COPY ./yarn.lock /app

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN yarn
RUN npm install -g nodemon

EXPOSE 3000

CMD ["yarn", "watch-api"]
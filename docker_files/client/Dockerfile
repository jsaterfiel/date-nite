FROM mhart/alpine-node:9

WORKDIR /app
COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app
COPY ./yarn.lock /app

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN yarn

EXPOSE 3000
EXPOSE 35729

CMD ["yarn", "start-client"]
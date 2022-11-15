FROM node:14.17.5

WORKDIR /var/www

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]
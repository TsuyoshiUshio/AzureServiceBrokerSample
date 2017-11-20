FROM node:8.9.1

RUN mkdir /var/www
ADD server /var/www/server
WORKDIR /var/www/server
RUN pwd
RUN npm update
RUN npm run grunt
CMD npm start


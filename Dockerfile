#TODO decrease image size
FROM node:9.4.0

USER root
# install chrome
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-unstable

COPY package-lock.json .
COPY package.json .
RUN npm install

COPY src .

EXPOSE 80

CMD [ "node", "index.js" ]
# TODO decrease image size

# Build from base image of node 9.4.0
FROM node:9.4.0

USER root

# Install chrome
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN set -x \
    && apt-get update \
    && apt-get install -y \
        google-chrome-unstable

COPY package-lock.json .
COPY package.json .

# Install needed packages
RUN npm install

# Copy src to the root
COPY src .

# Open port
EXPOSE 80

# Start index.js
CMD [ "node", "index.js" ]
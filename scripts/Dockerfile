ARG UBUNTU=focal
FROM ubuntu:${UBUNTU}
ARG UBUNTU

RUN apt update && \
    apt install curl gnupg -y
RUN echo "deb https://deb.nodesource.com/node_14.x $UBUNTU main" >> /etc/apt/sources.list.d/nodesource.list && \
    curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    apt update
RUN apt install -y -q nodejs
RUN npm install -g cordova && cordova telemetry off

ARG UBUNTU=jammy
FROM ubuntu:${UBUNTU}
ARG UBUNTU
ARG DEBIAN_FRONTEND=noninteractive

RUN apt update \
    && apt install curl gnupg rpm -y -q \
    && echo "deb https://deb.nodesource.com/node_20.x $UBUNTU main" >> /etc/apt/sources.list.d/nodesource.list \
    && curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
    && apt update \
    && apt install -y -q nodejs \
    && rm -rf /var/lib/apt/lists/*
RUN npm install -g cordova && cordova telemetry off

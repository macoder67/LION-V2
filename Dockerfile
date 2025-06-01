FROM node:lts-buster
RUN git clone https://github.com/macoder67/LION-V2/root/macoder67
WORKDIR /root/macoder67
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]

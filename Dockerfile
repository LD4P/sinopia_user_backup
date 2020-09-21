FROM circleci/node:14.11

WORKDIR /home/circleci

COPY . .

RUN npm install

CMD ["bin/backup"]

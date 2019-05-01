FROM circleci/node:10.15

WORKDIR /home/circleci

COPY . .

RUN npm install

# TODO: Add CMD later once JavaScript package is in place

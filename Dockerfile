FROM node:8.9.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN yarn install

ADD . /app

EXPOSE 4000
ENV PORT=4000

# CMD [ "node", "devserver.js" ]
# CMD [ "npm", "start" ]
CMD [ "yarn", "start" ]

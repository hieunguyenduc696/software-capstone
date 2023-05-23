FROM node:16

WORKDIR /software-capstone-fe

COPY yarn.lock package.json ./

EXPOSE 3000

RUN yarn

COPY . .

CMD ["yarn", "start"]
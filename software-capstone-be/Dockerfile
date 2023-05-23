FROM node:16

WORKDIR /software-capstone-be

COPY yarn.lock package.json ./

EXPOSE 3030

RUN yarn install

COPY . .

CMD ["yarn", "start"]
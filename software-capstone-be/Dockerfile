FROM node:16

WORKDIR /software-capstone-be

COPY yarn.lock package.json ./

EXPOSE 3030

RUN yarn

COPY . .

CMD ["yarn", "start"]
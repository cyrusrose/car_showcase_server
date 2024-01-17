FROM node:lts-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run generate:prisma
RUN npm run build statistics

FROM node:lts-alpine as production
WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/statistics/main"]
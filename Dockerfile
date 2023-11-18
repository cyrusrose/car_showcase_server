FROM node:lts-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=development
COPY . .

RUN npm run generate:prisma
RUN npm run build

FROM node:lts-alpine as production
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
FROM node:24.4.1-alpine3.22 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24.4.1-alpine3.22

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3002

CMD ["npm", "run", "start"]

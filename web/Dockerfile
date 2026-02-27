FROM node:24.4.1-alpine3.22 AS dependencies

WORKDIR /app

COPY package.json ./

RUN npm install

FROM node:24.4.1-alpine3.22 as builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npm run build;

FROM node:24.4.1-alpine3.22 AS runner

WORKDIR /app

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM cgr.dev/chainguard/node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node_modules/.bin/serve", "-s", "build", "-l", "3000"]
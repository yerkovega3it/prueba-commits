FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

ARG GIT_USERNAME
ARG GIT_TOKEN

# Configure git to use credentials
RUN git config --global url."https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/".insteadOf "https://github.com/"

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Runner stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/api ./api
COPY --from=builder /app/shared ./shared

EXPOSE 8080

CMD ["npm", "start"]
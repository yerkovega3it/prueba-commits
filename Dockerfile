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

# Build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_ENVIROMENT
ARG VITE_AMSA_LOGIN_URL
ARG VITE_AMSA_LOGOUT_URL

# Set environment variables so Vite can pick them up during build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ENVIROMENT=$VITE_ENVIROMENT
ENV VITE_AMSA_LOGIN_URL=$VITE_AMSA_LOGIN_URL
ENV VITE_AMSA_LOGOUT_URL=$VITE_AMSA_LOGOUT_URL

RUN npm run build

# Runner stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]

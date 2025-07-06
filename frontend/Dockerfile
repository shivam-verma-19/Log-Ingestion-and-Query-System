FROM node:20-alpine
WORKDIR /app
COPY . .
RUN apk update && apk upgrade --no-cache && npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]

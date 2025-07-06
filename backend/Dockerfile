FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

# Only install production dependencies
RUN npm install --omit=dev

# Copy source code after install (build cache optimization)
COPY . .

EXPOSE 3001
CMD ["npm", "start"]

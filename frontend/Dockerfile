# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

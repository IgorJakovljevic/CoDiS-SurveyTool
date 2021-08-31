FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY ./SocialMedia/package.json /app
RUN npm install
COPY ./SocialMedia /app
RUN npm run build


# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/SocialMedia /usr/share/nginx/html
COPY ./SocialMedia/nginx.conf /etc/nginx/conf.d/default.conf

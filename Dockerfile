FROM node:latest AS build-env
WORKDIR /app
ADD . .
RUN npm ci
RUN npm run build
RUN rm -rf node_modules
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs:14
WORKDIR /app
COPY --from=build-env /app .
CMD ["app/index.js"]

FROM node:latest
ENV PORT=5000
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
EXPOSE ${PORT}
CMD [ "node","dist/server.js"]
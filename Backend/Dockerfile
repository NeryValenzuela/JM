FROM node:14.17-alpine
WORKDIR /app
COPY . /app/
RUN npm install
COPY . /app/
EXPOSE 3000
CMD ["npm","start"]
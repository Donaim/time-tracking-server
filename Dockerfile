
FROM node:12.13.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
RUN chown app /opt/app
USER app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start" ]

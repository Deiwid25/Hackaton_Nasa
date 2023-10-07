FROM node:18.16.1-alpine


WORKDIR /geoportal

COPY ./geo-hub-front/ ./
RUN npm install 

EXPOSE 5173

CMD ["npm", "run","dev","--","--host"]

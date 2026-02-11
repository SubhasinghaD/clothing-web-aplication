FROM node:18-alpine
WORKDIR /app

# install only production deps for smaller image
COPY package*.json ./
RUN npm ci --production

# copy source
COPY . .

ENV PORT=4001
EXPOSE 4001

# run the server (server.js is the app entry)
CMD ["node", "server.js"]

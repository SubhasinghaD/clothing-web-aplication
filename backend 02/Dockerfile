# Use a lightweight Node.js runtime
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first to leverage cached Docker layers
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the rest of the application source code
COPY . .

# Set and expose the application port
ENV PORT=4003
EXPOSE 4003

# Start the server
CMD ["node", "server.js"]

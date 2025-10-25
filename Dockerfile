# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server package.json and install
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy client and build
COPY client/ ./client/
RUN npm run build

# Copy server source
COPY server/ ./server/

# Expose port
EXPOSE 5000

# Set environment variables (will be overridden by Render)
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "start"]

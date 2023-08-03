# Stage 1: Build the Vite React Application
FROM node:14-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the Vite React Application
FROM node:14-alpine

WORKDIR /app

# Install serve - a static file serving module
RUN npm install -g serve

# Copy the built artifact from the previous stage
COPY --from=builder /app/dist ./dist

# Start the application
CMD ["serve", "-s", "dist"]

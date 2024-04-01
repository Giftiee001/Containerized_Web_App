# Use a Node.js base image with LTS version as the base image
FROM node:lts-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
# COPY . .

# Build the production-ready application
RUN npm run build

# Use Nginx as the base image for serving the static files
FROM nginx:alpine

# Copy the built application from the previous stage to the Nginx server directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


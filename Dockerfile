# Use an official Node.js runtime based on Alpine Linux as the base image
FROM node:alpine

# Set the working directory in the container to /srv/app
WORKDIR /srv/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000 for the application
EXPOSE 8000

# Start the application
CMD [ "npm", "start" ]
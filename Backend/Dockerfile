# Use a slim Node.js base image for production
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
# This allows Docker to cache the npm install step if only code changes
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port your app listens on (this should match process.env.PORT in your app)
# While not strictly necessary for Render (as it uses process.env.PORT), it's good practice
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
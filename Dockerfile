# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory.
# This step is crucial for optimizing Docker layer caching.
# If only your source code changes, npm install won't be re-run unnecessarily.
COPY package.json package-lock.json ./

# Install project dependencies
# Use --omit=dev for production builds to only install production dependencies
RUN npm install --omit=dev

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your app runs on.
# This should match the PORT defined in your config.js (defaulting to 3000).
EXPOSE 3000

# Command to run the application
# This uses the "start" script defined in your package.json (pm2 start mulaa-xmd)
CMD [ "npm", "start" ]

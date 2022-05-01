# Create image based on the official Node 10 image from dockerhub
FROM node:latest

ENV http_proxy  http://proxy-us.intel.com:911
ENV https_proxy http://proxy-us.intel.com:912


# Create a directory where our app will be placed
RUN mkdir -p /server

# Change directory so that our commands run inside this new directory
WORKDIR /server

# Copy dependency definitions
COPY package*.json /server/

# Install dependecies
RUN npm run proxy-install

# Get all the code needed to run the app
COPY . /server/

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
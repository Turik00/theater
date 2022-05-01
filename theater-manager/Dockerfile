# Create image based on the official Node 10 image from dockerhub
FROM node:latest

ENV http_proxy  http://proxy-us.intel.com:911
ENV https_proxy http://proxy-us.intel.com:912

# Create a directory where our app will be placed
RUN mkdir -p /client

# Change directory so that our commands run inside this new directory
WORKDIR /client

# Copy dependency definitions
COPY package*.json /client/

# Install dependecies
RUN npm run proxy-install

# Get all the code needed to run the app
COPY . /client/

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
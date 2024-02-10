# Use an official lightweight Node.js image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the content of the local src directory to the working directory
COPY . .

# Specify the port number the container should expose
EXPOSE 80

# Run the application
CMD ["node", "-e", "require('http').createServer((req, res) => res.end(require('fs').readFileSync('index.html'))).listen(80)"]
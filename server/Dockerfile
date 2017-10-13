FROM mhart/alpine-node:8.6.0

# Create a directory where our app will be placed
RUN mkdir -p /srv/server

# Change directory so that our commands run inside this new directory
WORKDIR /srv/server


# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /srv/server

# Expose the port the app runs in
EXPOSE 8000

# Serve the app
CMD ["node", "server.js"]

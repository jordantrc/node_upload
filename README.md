# node_upload
Simple node.js server that accepts a file upload

# Installation
npm install package.json

# Execution
The server will generate a random username and password combination to use for basic authentication.

## HTTP
1. Run the command node upload_server.js upload/directory/name


## HTTPS
1. Provide your own keys, or generate new keys using genrsa.sh
2. Run the command node upload_server.js -s upload/directory/name

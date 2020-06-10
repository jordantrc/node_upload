# node_upload
Simple node.js server that accepts a file upload

# Installation
`npm install package.json`

# Execution
The server will generate a random username and password combination to use for basic authentication.

## HTTP
1. Run the command `node upload_server.js upload/directory/name`


## HTTPS
1. Provide your own keys, or generate new keys using `genrsa.sh`
2. Run the command `node upload_server.js -s upload/directory/name`

# Upload files!

Some examples for uploading files to the server:

## curl
```bash
curl -u username:password -F 'filetoupload=@/path/to/file' http[s]://servername:port/fileupload
```

## PowerShell
```powershell
$uri = "http[s]://servername:port/fileupload
$username = username
$password = password
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username,$password)))
$contentType = "multipart/form-data"
$body = @{"filetoupload" = get-content($filePath) -Rawb}
Invoke-RestMethod -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Uri $uri -Method POST -ContentType $contentType -Body $body
```
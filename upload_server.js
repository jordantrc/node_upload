// A simple server that accepts a file upload

var auth = require('basic-auth');
var compare = require('tsscmp');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var timestamp = require('time-stamp');

// parse command line arguments
if (process.argv.length < 3) {
    console.log(`Usage: node ${process.argv[1]} <upload directory>`);
    process.exit();
} else {
    uploadFolder = process.argv[2];
}

// generate credentials
username = Math.random().toString(36).substring(2, 15);
password = Math.random().toString(36).substring(2, 15);
console.log(`Username: ${username}`);
console.log(`Password: ${password}`);

var server = http.createServer(function (req, res) {
    var credentials = auth(req);
    // check credentials
    if (!credentials || !checkauth(credentials.name, credentials.pass)) {
        log(req, "invalid login");
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="upload"');
        res.end('Access denied');
    } else {
        if (req.url == '/fileupload') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var oldpath = files.filetoupload.path;
                var newpath = uploadFolder + files.filetoupload.name;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                })
                res.write(`File uploaded and moved to ${newpath}`);
                log(req, `file ${files.filetoupload.name} uploaded`);
                res.end();
            })
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit" value="Upload">');
            res.write('</form>');
            return res.end();
        }
    }
});

// function to check authentication
function checkauth(name, pass) {
    var valid = true;

    valid = compare(name, username) && valid;
    valid = compare(pass, password) && valid;

    return valid;
}

// produces log output
function log(req, msg) {
    // Apache log format
    //10.185.248.71 - - [09/Jan/2015:19:12:06 +0000] 808840 "GET /inventoryService/inventory/purchaseItem?userId=20253471&itemId=23434300 HTTP/1.1" 500 17 "-" "Apache-HttpClient/4.2.6 (java 1.5)"
    timeString = timestamp('DD/MM/YYYY:HH:MM:SS');
    console.log(`${req.connection.remoteAddress} - - [${timeString}] ${req.url} - ${msg}`);
}

// start server loop
server.listen(8080);
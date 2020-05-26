// A simple server that accepts a file upload

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

// parse command line arguments
if (process.argv.length < 3) {
    console.log(`Usage: node ${process.argv[1]} <upload directory>`);
    process.exit();
} else {
    uploadFolder = process.argv[2];
}

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = uploadFolder + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.log(`An error occurred: ${err}`);
                }
                res.write(`File uploaded and moved to ${newpath}`);
                res.end();
            })
            res.write('File uploaded');
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
}).listen(8080);
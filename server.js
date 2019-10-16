var http = require('http');
var fs = require('fs');

const PORT=3000;

var server = http.createServer(function(req, res) {
  fs.readFile('index.html', function(err, data) {
    if (!err) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    } else {
      console.log('error');
    }
  });
});
server.listen(PORT, function(req, res) {
  console.log('server is running on port '+PORT);
});


/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8000);
*/

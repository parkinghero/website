var express = require('express');
var app = express();
var api = require('./api');

app.use(api.router);
app.use(express.static(__dirname + '/dist'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

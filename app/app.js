var express = require('express');
var app = express();
app.use('/static', express.static('static'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/hi', function(req, res) {
    res.send('Hi!')
});

app.get('/delay/:seconds', function(req, res) {
    const seconds = req.param("seconds") || 1;
    setTimeout(function() {
        res.send('Delayed Hello World in ' + seconds + 's!')
    }, seconds * 1000);
});

app.get('/slow-name.js', function(req, res) {
    setTimeout(function() {
        res.header('content-type', 'text/javascript');
        res.send("define([], function() { return { name: 'Freewind' }})");
    }, 1000);
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

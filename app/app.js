var express = require('express');
var app = express();
app.use('/static', express.static('static'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/delay', function(req, res) {
    setTimeout(function() {
        res.send('Delayed Hello World!')
    }, 5000);
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

var express = require('express');
var uuid = require('uuid');

var app = express();
var id = uuid.v4();
var port = 3000;

app.get('/',  (req, res) => {
	res.send(id);
});


app.listen(port, () => {
	console.log('Example app listening on port: ' + port);
});

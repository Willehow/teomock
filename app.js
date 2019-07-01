'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'pdf')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'images/teo')));
 
//server.listen(3001);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/proponentesPorCPF', function (req, res) {
  res.send({
	"cpf":"00000000001",
  	"nome": "Jonelson"
  });
});


module.exports = app;

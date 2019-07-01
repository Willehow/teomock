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

app.post('/login', (req, res) => {
 
  var cpf = req.body.username;

  if(cpf == "00000000001" || cpf == "00000000002" || cpf == "00000000003"){
	  
	  res.sendStatus(200);
     } else {
     	res.sendStatus(403);
     }
});

module.exports = app;

'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'pdf')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'images/teo')));
 
//server.listen(3001);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/proposta/:cpf', function (req, res) {

  switch(req.params.cpf) {
    case "00000000002":
      // code block
      res.send({
        "cpf":"00000000002",
        "nome": "Jonelson",
        "contribuicao": {
          "percentual": "8%",
          "valor": "R$200"
        }
      });
      break;
    case "00000000003":
      // code block
      res.send({
        "cpf":"00000000003",
        "nome": "Joilson",
        "contribuicao": {
          "percentual": "8%",
          "valor": "R$300"
        }
      });
      break;
    case "00000000004":
      // code block
      res.send({
        "cpf":"00000000004",
        "nome": "Jow",
        "contribuicao": {
          "percentual": "8%",
          "valor": "R$500"
        }
      });
      break;
    default:
      // code block
      res.send("Não encontrado");
  }

});

app.post('/login', (req, res) => {

  var cpf = req.body.username.replace(/\D/g, '');
  var password = req.body.password;

  if ((cpf == "00000000002" || cpf == "00000000003" || cpf == "00000000004" || cpf == "00000000005") && password == "20182018") {

    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

module.exports = app;

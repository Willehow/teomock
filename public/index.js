
$(document).ready(function ($) {
  $('#username').mask('999.999.999-99');
});

var token = '';
var objCPF = '';
var objPrincipal = document.getElementById('principal');
var objTarget = document.getElementById('sdk-target');
var objAlert = document.getElementById('alert');
var novoTeo = false;

function login() {
 
  objCPF = document.getElementById('username');
  var objPassword = document.getElementById('password');

  var data_2_7 = { username: objCPF.value.replace(/\D/g, ''), password: objPassword.value };
  var data_5_1 = { login: objCPF.value.replace(/\D/g, ''), senha: objPassword.value };
  
  if (!isValidLogin("https://ecs.api-dev.brasilprev.com.br/propostacorp/login", data_2_7, false)) {
    if (!isValidLogin("https://api-dev.brasilprev.com.br/public/empresarial/login", data_5_1, true)){
      objAlert.style.display = "block";
    }
  }
}

function isValidLogin(url, data, ehNovoTeo) {
  var settings = {
    "url": url,
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify(data),
  };
  novoTeo = ehNovoTeo;
  
  $.ajax(settings).done(function (response) {
    token = response.token;
    
    objPrincipal.style.display = "none";
    objTarget.style.display = "block";
    objAlert.style.display = "none";
    
    console.log("abrindo blip");

    buildChat({ authType: BlipChat.DEV_AUTH });
    toogleChat();
    updateContacts(objCPF.value,novoTeo);
  }).fail(function (code, textStatus) {
    return new Boolean(false);
  });

  return new Boolean(true);
}
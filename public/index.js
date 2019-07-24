
$(document).ready(function ($) {
  $('#username').mask('999.999.999-99');
});

var token = '';

function login() {
  var objPrincipal = document.getElementById('principal');
  var objTarget = document.getElementById('sdk-target');
  var objAlert = document.getElementById('alert');
  var objCPF = document.getElementById('username');
  var objPassword = document.getElementById('password');

  var data = { username: objCPF.value.replace(/\D/g, ''), password: objPassword.value };
  //$.post("http://localhost:8080/propostacorp/login", JSON.stringify(data), (result, status, xhr) => {
  $.post("https://ecs.api-dev.brasilprev.com.br/propostacorp/login", JSON.stringify(data), (result, status, xhr) => {
    token = result.token;
    objPrincipal.style.display = "none";
    objTarget.style.display = "block";
    objAlert.style.display = "none";
    buildChat({ authType: BlipChat.DEV_AUTH });
    toogleChat();
    updateContacts(objCPF.value);
  }).fail((error) => {
    objAlert.style.display = "block";
  });
}
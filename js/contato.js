// Coloca o curso escolhido no assunto do e-mail.
var curso = new URLSearchParams(window.location.search).get('curso');
var email = document.getElementById('email-contato');
if (email && curso) {
    email.href = 'mailto:teste@hotmail.com?subject=' + encodeURIComponent('Informações sobre ' + curso);
}

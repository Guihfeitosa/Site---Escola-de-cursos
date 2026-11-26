// Abre e fecha o menu em telas pequenas.
var botao = document.getElementById('btn-menu');
var menu = document.getElementById('nav');

if (botao && menu) {
    document.documentElement.classList.add('js');
    botao.addEventListener('click', function () {
        var aberto = menu.classList.toggle('mostrar');
        botao.setAttribute('aria-expanded', String(aberto));
        botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
}

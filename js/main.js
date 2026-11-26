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

// Mostra cada seção com uma animação ao entrar na tela.
var secoes = document.querySelectorAll('main section');
var movimentoReduzido = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
var animacoes = [];

if ('IntersectionObserver' in window) {
    var observador = new window.IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) return;

            var secao = entrada.target;
            observador.unobserve(secao);

            // Mantém o conteúdo visível para quem usa teclado ou prefere menos movimento.
            if ((movimentoReduzido && movimentoReduzido.matches) || secao.contains(document.activeElement) || typeof secao.animate !== 'function') return;

            var animacao = secao.animate([
                { opacity: 0.65, transform: 'translateY(12px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 450, easing: 'ease-out' });
            animacoes.push(animacao);
            animacao.onfinish = function () {
                animacoes = animacoes.filter(function (item) { return item !== animacao; });
            };
        });
    }, { threshold: 0 });

    secoes.forEach(function (secao) {
        observador.observe(secao);
    });
}

// Para as animações se a preferência mudar enquanto a página estiver aberta.
if (movimentoReduzido && movimentoReduzido.addEventListener) {
    movimentoReduzido.addEventListener('change', function (evento) {
        if (evento.matches) {
            animacoes.forEach(function (animacao) { animacao.cancel(); });
            animacoes = [];
        }
    });
}

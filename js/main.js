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

// Usa uma animação simples quando o navegador não tem transição entre páginas.
var movimentoReduzido = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
var transicaoNativa = 'onpageswap' in window && 'onpagereveal' in window &&
    window.CSS && CSS.supports('view-transition-name: cabecalho') &&
    (location.protocol === 'http:' || location.protocol === 'https:');
var partes = document.querySelectorAll('main, .banner, footer');
var animacoes = [];
var navegando = false;

function animarPartes(entrada) {
    var quadros = entrada ? [
        { opacity: 0.6, transform: 'translateX(14px)' },
        { opacity: 1, transform: 'translateX(0)' }
    ] : [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0.6, transform: 'translateX(-14px)' }
    ];
    animacoes = Array.from(partes).map(function (parte) {
        return parte.animate(quadros, { duration: 220, easing: 'ease-out', fill: entrada ? 'none' : 'forwards' });
    });
    return animacoes;
}

function podeAnimar() {
    return !transicaoNativa && !(movimentoReduzido && movimentoReduzido.matches) &&
        partes.length > 0 && Array.from(partes).every(function (parte) { return typeof parte.animate === 'function'; });
}

if (podeAnimar()) animarPartes(true);

// Ao voltar para uma página guardada pelo navegador, mostra o conteúdo novamente.
window.addEventListener('pageshow', function (evento) {
    if (evento.persisted) {
        animacoes.forEach(function (animacao) { animacao.cancel(); });
        animacoes = [];
        navegando = false;
        if (podeAnimar()) animarPartes(true);
    }
});

// Anima só links para outras páginas do próprio site.
document.addEventListener('click', function (evento) {
    if (!podeAnimar() || evento.defaultPrevented || evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey || !evento.target.closest) return;
    var link = evento.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    var destino = new URL(link.href, location.href);
    var mesmaPagina = destino.pathname === location.pathname && destino.search === location.search;
    var paginaDoSite = /\/(index|curso|professores|contatos)\.html$/.test(destino.pathname);
    if (destino.origin !== location.origin || !paginaDoSite || mesmaPagina) return;
    if (navegando) { evento.preventDefault(); return; }

    var saida;
    try {
        saida = animarPartes(false);
    } catch (erro) {
        return;
    }
    evento.preventDefault();
    navegando = true;
    var abriu = false;
    function abrirPagina() {
        if (abriu) return;
        abriu = true;
        location.assign(destino.href);
    }
    Promise.all(saida.map(function (animacao) {
        if (animacao.finished && typeof animacao.finished.then === 'function') {
            return animacao.finished.catch(function () {});
        }
        return new Promise(function (resolve) { window.setTimeout(resolve, 220); });
    })).then(abrirPagina);
    window.setTimeout(abrirPagina, 500);
});

// Para as animações se a preferência mudar enquanto a página estiver aberta.
if (movimentoReduzido && movimentoReduzido.addEventListener) {
    movimentoReduzido.addEventListener('change', function (evento) {
        if (evento.matches) {
            animacoes.forEach(function (animacao) { animacao.cancel(); });
            animacoes = [];
        }
    });
}

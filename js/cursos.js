// Filtra os cursos e as áreas pelo texto digitado.
var campo = document.getElementById('busca-curso');
var areaBusca = document.getElementById('area-busca');
var cursos = document.querySelectorAll('.curso');
var areas = document.querySelectorAll('.area_estudo');
var secaoAreas = document.getElementById('categorias');
var resultadosAreas = document.getElementById('resultados-areas');
var resultado = document.getElementById('resultado-busca');

function textoSimples(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function combina(item, palavras) {
    var titulo = item.querySelector('h3').textContent;
    var texto = textoSimples((item.getAttribute('data-busca') || '') + ' ' + titulo);
    return palavras.every(function (palavra) { return texto.includes(palavra); });
}

// Mostra a área na lista, usando os dados que já estão na página.
function mostrarArea(area) {
    var artigo = document.createElement('article');
    var imagem = area.querySelector('img').cloneNode(true);
    var texto = document.createElement('div');
    var titulo = area.querySelector('h3').cloneNode(true);
    var descricao = area.querySelector('p').cloneNode(true);
    var link = document.createElement('a');
    var seta = document.createElement('span');
    var detalhe = document.createElement('span');
    artigo.className = 'curso';
    imagem.className = 'curso_imagem';
    texto.className = 'curso_texto';
    link.href = 'contatos.html?curso=' + encodeURIComponent(titulo.textContent);
    link.appendChild(document.createTextNode('Pedir informações '));
    seta.setAttribute('aria-hidden', 'true');
    seta.textContent = '→';
    detalhe.className = 'sr-only';
    detalhe.textContent = ' sobre ' + titulo.textContent;
    link.appendChild(seta);
    link.appendChild(detalhe);
    texto.appendChild(titulo);
    texto.appendChild(descricao);
    artigo.appendChild(imagem);
    artigo.appendChild(texto);
    artigo.appendChild(link);
    resultadosAreas.appendChild(artigo);
}

if (campo && areaBusca && resultado && secaoAreas && resultadosAreas) {
    areaBusca.hidden = false;
    campo.addEventListener('input', function () {
        var busca = textoSimples(campo.value.trim());
        var palavras = busca ? busca.split(' ') : [];
        var encontrados = 0;
        cursos.forEach(function (curso) {
            var aparece = combina(curso, palavras);
            curso.hidden = !aparece;
            if (aparece) encontrados++;
        });

        resultadosAreas.textContent = '';
        secaoAreas.hidden = Boolean(busca);
        if (busca) {
            areas.forEach(function (area) {
                if (combina(area, palavras)) {
                    mostrarArea(area);
                    encontrados++;
                }
            });
        }
        resultado.textContent = busca ? (encontrados === 1 ? '1 resultado encontrado.' : encontrados + ' resultados encontrados.') : '';
    });
}

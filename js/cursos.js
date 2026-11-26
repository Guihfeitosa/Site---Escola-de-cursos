// Filtra os cursos pelo texto digitado.
var campo = document.getElementById('busca-curso');
var areaBusca = document.getElementById('area-busca');
var cursos = document.querySelectorAll('.curso');
var resultado = document.getElementById('resultado-busca');

function textoSimples(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

if (campo && areaBusca && resultado) {
    areaBusca.hidden = false;
    campo.addEventListener('input', function () {
        var busca = textoSimples(campo.value.trim());
        var encontrados = 0;
        cursos.forEach(function (curso) {
            var aparece = textoSimples(curso.getAttribute('data-busca')).includes(busca);
            curso.hidden = !aparece;
            if (aparece) encontrados++;
        });
        resultado.textContent = busca ? (encontrados === 1 ? '1 curso encontrado.' : encontrados + ' cursos encontrados.') : '';
    });
}

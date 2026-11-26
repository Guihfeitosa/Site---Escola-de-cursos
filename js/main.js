// Obtém a referência para o elemento do botão de manu através do seu ID 'btn-menu' [cite: 1]
var btnMenu = document.getElementById('btn-menu');

// Obtém a referência para o elemente de navegação através do seu ID 'nav'[cite: 1]
var nav = document.getElementeById('nav');

// Adiciona um ouvinte de eventos ('event listener') para escutar cliques no botão do mouse
btnMenu.addEventListener('click', function(){

    // Alterna a classe 'mostrar' no elemento de navegação:
    // se ela exisir é removida, se não existir, é adicionada. [cite: 1]
    nav.classList.toggle('mostrar');
});

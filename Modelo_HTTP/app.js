/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var cards = [];


/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    };
  //postando em http
  fetch('https://video-aula-firebase.firebaseio.com/card.json', {
    body: JSON.stringify(card),
    method: 'POST',
    mode: 'no-cors',
  }).catch(err => console.log(err)); 
  
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);

    //deletando usando fetch
      fetch('https://video-aula-firebase.firebaseio.com/card/'+ id +'.json', {
        body: JSON.stringify(card),
        method: 'DELETE',
        mode: 'cors'
  }).catch(err => console.log(err)); 

   
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText;
    countNumber = countNumber + 1;
//usando put
    fetch('https://video-aula-firebase.firebaseio.com/card/'+ id +'/curtidas.json', {
        body: JSON.stringify(countNumber),
        method: 'PUT',
        mode: 'cors'
  }).catch(err => console.log(err)); 
    
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName('count-number')[0];
    var countNumber = +count.innerText;
    
    if (countNumber > 0 ) {
        countNumber = countNumber - 1;
        fetch('https://video-aula-firebase.firebaseio.com/card/'+ id +'/curtidas.json', {
            body: JSON.stringify(countNumber),
            method: 'PUT',
            mode: 'cors'
        }).catch(err => console.log(err));
    };
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {

    //buscando com fetch
    fetch('https://video-aula-firebase.firebaseio.com/card.json')
    .then(res => res.json())
    .then(res => {
        console.log('response', res);
        for(var key in res) {
            adicionaCardATela(res[key],key);
        };
    })

});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}
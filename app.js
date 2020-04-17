/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var cards = [];
// firebase e um objeto global 
    // database() e um metodo de acesso ao meu real time database
    // ref() e a referencia do caminho do banco 
var ref = firebase.database().ref('card/');

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    };
    
    // set() metodo que cria dados na url passada 
    //metodo push e um metodo que cria um id unico, gerado em um hash de acordo com o date time que foi postado
    ref.push(card).then(snapshot =>{
        //adicionaCardATela(card, snapshot.key);
    });
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);
    //remove() remove o no com tds os nos filhos
    ref.child(id).remove().then(() => {
        card.remove();
    });

    //set(null) ao setar um no em nulo exclui esse no do firebase
    //ref.child(id).set(null).then(() =>{    card.remove();});
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
    // .set Pode ser acessado diretamente o objeto que quer atualizar e passar o valor atualizado 
    // ou pode-se passar o objeto completo e atualiza-lo com os novos valores nos campos correspondentes
    ref.child(id + '/curtidas').set(countNumber).then(() => {
        count.innerText = countNumber;
    });
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
        //update recebe um objeto (apenas um objeto) e atualiza apenas as propriedades desse objeto
        ref.child(id).update({curtidas: countNumber }).then(() => {
            count.innerText = countNumber;
        });
    };
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    //ref.on('value', snapshot => {
    //    snapshot.forEach(value => {
    //        adicionaCardATela(value.val(), value.key);
    //    });
    //});
    ref.on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(),snapshot.key);
    });

    ref.on('child_changed', (snapshot, uid) => {
        console.log(snapshot.key, uid);
    }); 

    ref.on('child_removed', (snapshot, uid) => {
        console.log('remove', uid);
    });   
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
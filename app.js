/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

var ref = firebase.storage().ref('arquivos');



/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    var arquivo = event.target.files[0];

    ref.child('arquivo').put(arquivo).then(snapshot => {
    	console.log('snapshot', snapshot);
    	ref.child('arquivo').getDownloadURL().then(function(downloadURL){
    		console.log('url', downloadURL);
    	}); 
    });
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
	var arquivo = event.target.files[0];
	//ler o arquivo
	const reader = new FileReader();
	reader.readAsDataURL(arquivo);
	//converte em base64
	reader.onload = function(){
		//console.log(reader.result);
		//quebra a string e retorna so base64
		const base64 = reader.result.split('base64,')[1];

		ref.child('imagem').putString(base64, 'base64', { contentType: 'imagem/png'}).then(snapshot => {
			console.log('snapshot', snapshot);

			ref.child('imagem').getDownloadURL().then(function(downloadURL){
    		console.log('url', downloadURL);
    		});

		});
	}
}
var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    firebase.auth().createUserWithEmailAndPassword(email,senha).then(user => {
        console.log('usuario', user);
        alert('Usuario criado com sucesso!');
    }).catch(err => {
        console.log('error ', err);    
    });
    
    
}

/**
 * Função para login
 */
function loginEmail() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
        alert('Usuario Logado com sucesso');     
    }).catch(err => {
        console.log('error', err);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    //observa se ha usuarios logados 
    firebase.auth().onAuthStateChanged((usuario) => {
        if(usuario){
            console.log('usuario logado', usuario);
            currentUser = usuario;
            //linguagem do email
            firebase.auth().languageCode = 'pt';
            //verifica se o usuario ja fez a verificacao
            if(!usuario.emailVerified){
                //envia um email verificando a conta dele 
                usuario.sendEmailVerification().then(() => {
                    alert('verifique sua caixa de email');
                });
                //reset de email
                firebase.auth().sendPasswordResetEmail(usuario.email).then(() => {
                    console.log('reset de senha enviado');
                })
            };
        }else{
            console.log('nao usuarios logados');
        }
    });
    
    
    

    /**firebase.auth().currentUser.updateProfile({
        displayName: "Jose",
        photoUrl: 'https://www.facebook.com/photo?fbid=641058683106539&set=a.110376056174807',

    });
    */
    
});
function logout() {
    firebase.auth().signOut().then(() => {
        alert('Usuario deslogou');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    //configuracoes do ui
    const config = {
        callbacks: {
            //apos logar ele retorna uma autenticacao e uma  url
            signInSucessWithAuthResult: function(authResult){
                console.log('authrResult', authResult);
                return false; 
            }
        },
        signInOptions: [
            //icones de login
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID
            
            
        ],
        signInFlow: 'popup'
    };
    //instanciamento do ui com os parametro id da div e as configuracoes salvas no config
    ui.start('#firebaseui', config);
});
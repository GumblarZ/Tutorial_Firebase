function logout() {
    firebase.auth().signOut().then(() => {
        alert('Usuario deslogou');
    });
}
import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAkV7zmsqfggYzq1YJ-i94al1BtT_lSbrs",
    authDomain: "hack-the-north-2019-b7804.firebaseapp.com",
    databaseURL: "https://hack-the-north-2019-b7804.firebaseio.com",
    projectId: "hack-the-north-2019-b7804",
    storageBucket: "",
    messagingSenderId: "123634725062",
    appId: "1:123634725062:web:06cc5d41f1d3fc961da7c7"
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    // Auth API
    createUser = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    signIn = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut = () => {
        return this.auth.signOut();
    }

    resetPassword = (email) => {
        return this.auth.sendPasswordResetEmail(email);
    }

    updatePassword = password => {
        return this.auth.currentUser.updatePassword(password);
    }
}

export default Firebase;
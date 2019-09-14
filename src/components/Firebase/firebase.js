import app from 'firebase/app';

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
    }
}

export default Firebase;
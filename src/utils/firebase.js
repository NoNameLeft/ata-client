import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAAf5OxxqfPWlhrOMQzs2fgI46SQ6HB2lk",
    authDomain: "ata-client.firebaseapp.com",
    projectId: "ata-client",
    storageBucket: "ata-client.appspot.com",
    messagingSenderId: "816648250034",
    appId: "1:816648250034:web:03dc9605dddf31e2c4dfab",
    measurementId: "G-XLKPZ3DBLV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
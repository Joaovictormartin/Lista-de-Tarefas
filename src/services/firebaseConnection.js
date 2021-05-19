import firebase from 'firebase/app';
import 'firebase/database';


let firebaseConfig = {
    apiKey: "AIzaSyDdt1NO98IubmeHXpQT_1kMLyjazEPFeu4",
    authDomain: "meuapp-7efec.firebaseapp.com",
    databaseURL: "https://meuapp-7efec-default-rtdb.firebaseio.com",
    projectId: "meuapp-7efec",
    storageBucket: "meuapp-7efec.appspot.com",
    messagingSenderId: "572424326685",
    appId: "1:572424326685:web:889276cb84dde26547c0f4",
    measurementId: "G-WF437NL8VY"
};

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
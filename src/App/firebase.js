import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBW6EDVxNICcVQzMgmgTCCAx7e68CdWoVk",
    authDomain: "medical-care-f0bff.firebaseapp.com",
    projectId: "medical-care-f0bff",
    storageBucket: "medical-care-f0bff.appspot.com",
    messagingSenderId: "378036862805",
    appId: "1:378036862805:web:7bf544891de96a0ed3f9dc"
}

firebase.initializeApp(config);
export default firebase;
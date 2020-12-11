const _firebaseConfig = {
    apiKey: "AIzaSyB2JAfadwVLxI2NN9VNkRrTFRjtgoeSiUM",
    authDomain: "boardgamecafe-ddf38.firebaseapp.com",
    projectId: "boardgamecafe-ddf38",
    storageBucket: "boardgamecafe-ddf38.appspot.com",
    messagingSenderId: "14516573810",
    appId: "1:14516573810:web:d6e3a99a022e7309e3d4eb"
};
// Initialize Firebase
firebase.initializeApp(_firebaseConfig);
const _db = firebase.firestore();
const userRef = _db.collection("users");


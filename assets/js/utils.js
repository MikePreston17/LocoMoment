var config = {
    apiKey: "AIzaSyDhjGCfJWi-8L1EtnNA1-tTGIz3R5_iG6Y",
    authDomain: "loco-moment.firebaseapp.com",
    databaseURL: "https://loco-moment.firebaseio.com",
    projectId: "loco-moment",
    storageBucket: "",
    messagingSenderId: "538694652392"
};

firebase.initializeApp(config);

var db = firebase.database();
const root = db.ref();
const trains = root.child('trains');


const isNullOrEmpty = target => {
    for (var member in target) {
        if (target[member] == null || target[member] == '')
            return true;
    }
    return false;
}
const firebaseConfig = {
    apiKey: "AIzaSyCZfeIB54tVhMnjAbOIrxDMZzp1oTgakNY",
    authDomain: "userlogin-33eb6.firebaseapp.com",
    databaseURL: "https://userlogin-33eb6-default-rtdb.firebaseio.com",
    projectId: "userlogin-33eb6",
    storageBucket: "userlogin-33eb6.appspot.com",
    messagingSenderId: "233459826429",
    appId: "1:233459826429:web:3835c0c89b75ca4e7b0894"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const storage = firebase.storage();
  const database = firebase.database();
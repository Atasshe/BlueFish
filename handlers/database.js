const firebase = require("firebase")
module.exports = (client) => {
  try {
    var firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.ADOMAIN,
    databaseURL: process.env.DBURL,
    projectId: process.env.PID,
    storageBucket: process.env.SBUCKET,
    messagingSenderId: process.env.MSGSENDER,
    appId: process.env.APPID
  }; 
  firebase.initializeApp(firebaseConfig);
  client.db = firebase.database()
  console.log("Conectado a database")
  } catch (err) {
    console.log("Erro ao conectar com a database")
  }
}
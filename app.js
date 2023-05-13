const express = require('express');
const firebase = require('firebase');

const app = express();
const port = 3000;

const firebaseConfig = {
    apiKey: "AIzaSyBWpQHxB7GbhRLJQDzf-zMPHBP-30-Ltjw",
    authDomain: "hackupc-b04b0.firebaseapp.com",
    projectId: "hackupc-b04b0",
    storageBucket: "hackupc-b04b0.appspot.com",
    messagingSenderId: "297126836194",
    appId: "1:297126836194:web:e9138e7a49e00e91942bbb",
    measurementId: "G-2FTXPJXSYV"
};

const scoreboard = [
    { name: "Alice", sensor1: 100, sensor2:100 },
    { name: "Bob", sensor1: 100, sensor2:100  },
    { name: "Charlie", sensor1: 100, sensor2:100  },
    { name: "Dave", sensor1: 100, sensor2:100  },
    { name: "Eve", sensor1: 100, sensor2:100  }
];

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.collection('competitors')
    .get()
    .then((querySnapshot) => {
      const scoreboard = querySnapshot.docs.map((doc) => {
        return { name: doc.data().name, sensor1: doc.data().sensor1, sensor2: doc.data().sensor2};
      });
      console.log(scoreboard)
      res.render('scoreboard', { scoreboard });
    })
    .catch((error) => {
      console.error('Error getting scores:', error);
      res.render('error', { error });
    });
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
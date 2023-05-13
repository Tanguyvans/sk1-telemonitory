const express = require('express');
const firebase = require('firebase');

const app = express();

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBWpQHxB7GbhRLJQDzf-zMPHBP-30-Ltjw",
    authDomain: "hackupc-b04b0.firebaseapp.com",
    projectId: "hackupc-b04b0",
    storageBucket: "hackupc-b04b0.appspot.com",
    messagingSenderId: "297126836194",
    appId: "1:297126836194:web:e9138e7a49e00e91942bbb",
    measurementId: "G-2FTXPJXSYV"
  };

firebase.initializeApp(firebaseConfig);

// Define Firebase database reference
const database = firebase.database();

// Create an endpoint to get data from Firebase
app.get('/data', (req, res) => {
  // Read data from Firebase database
  database.ref('/path/to/data').once('value')
    .then(snapshot => {
      const data = snapshot.val();
      res.send(data);
    })
    .catch(error => {
      console.log('Error getting data:', error);
      res.status(500).send('Error getting data');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

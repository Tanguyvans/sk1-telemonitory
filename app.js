const express = require('express');
const firebase = require('firebase');

const app = express();
const port = 3000;

// const firebaseConfig = {
//     apiKey: "AIzaSyBWpQHxB7GbhRLJQDzf-zMPHBP-30-Ltjw",
//     authDomain: "hackupc-b04b0.firebaseapp.com",
//     projectId: "hackupc-b04b0",
//     storageBucket: "hackupc-b04b0.appspot.com",
//     messagingSenderId: "297126836194",
//     appId: "1:297126836194:web:e9138e7a49e00e91942bbb",
//     measurementId: "G-2FTXPJXSYV"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDBOOaB-hXKzzDLBDSyW7GVoCMqQfid3c8",
  authDomain: "hackupc-402e1.firebaseapp.com",
  projectId: "hackupc-402e1",
  storageBucket: "hackupc-402e1.appspot.com",
  messagingSenderId: "550356291672",
  appId: "1:550356291672:web:a5816facf7bdf9a249fa2d",
  measurementId: "G-YX5JD9247F"
};

const scoreboard = [
    { name: "Alice", sensor1: 100, sensor2:100 },
    { name: "Bob", sensor1: 100, sensor2:100  },
    { name: "Charlie", sensor1: 100, sensor2:100  },
    { name: "Dave", sensor1: 100, sensor2:100  },
    { name: "Eve", sensor1: 100, sensor2:100  }
];

const imageNumber = '8'; 

const order = {
  'start':1,
  'sensor1':2,
  'sensor2':3,
  'sensor3':4,
  'sensor4':5,
  'sensor5':6,
  'sensor6':7,
  'end':8
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const checkDatabase = (req, res, next) => {
  setInterval(() => {
    db.collection('competitors')
    .get()
    .then((querySnapshot) => {
      const scoreboard = querySnapshot.docs.map((doc) => {
        return { 
          name: doc.data().name, 
          start: doc.data().start, 
          sensor1: doc.data().sensor1, 
          sensor2: doc.data().sensor2,
          sensor3: doc.data().sensor3,
          sensor4: doc.data().sensor4, 
          sensor5: doc.data().sensor5,  
          sensor6: doc.data().sensor6, 
          end: doc.data().end, 
        };
      });
      console.log(scoreboard)
      req.scoreboard = scoreboard; // store the default scoreboard data in req object
      next();
    })
    .catch((error) => {
      console.error('Error getting scores:', error);
      const scoreboard = [{
        name:'a', 
        sensor1: -1,
        sensor2: -2
      }]
      req.scoreboard = scoreboard; // store the default scoreboard data in req object
      next();
    });
  }, 10000); // check every 5 seconds
};
app.set('view engine', 'ejs');

// use the checkDatabase middleware
// app.use(checkDatabase);

app.get('/', checkDatabase, (req, res) => {
  const scoreboard = req.scoreboard; // retrieve the scoreboard data from req object

  let post = 0;

  for (let key in scoreboard[0]) {
    if (scoreboard[0][key].detected && order[key] > post) {
      post = order[key];
    }
  }
  const imageNumber = post.toString()

  console.log(imageNumber)
  res.render('scoreboard', { scoreboard, imageNumber });
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
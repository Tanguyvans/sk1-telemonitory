const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

const app = express();
const extraInfoApp = express();
const webAppPort = 3500;
const extraInfoPort = 4000;
const timer = 1000;

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

const imageNumber = '0'; 

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

let startTime = null;

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const checkDatabase = (req, res, next) => {
  setInterval(() => {
    db.collection('competitors')
    .get()
    .then((querySnapshot) => {
      const scoreboard = querySnapshot.docs.map((doc) => {
        return { 
          id: doc.id,
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
      // console.log(scoreboard)
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
  }, timer); // check every 5 seconds
};
app.set('view engine', 'ejs');

app.get('/', checkDatabase, (req, res) => {
  const scoreboard = req.scoreboard; // retrieve the scoreboard data from req object
  
  let post = 0;

  for (let key in scoreboard[0]) {
    if (scoreboard[0][key].detected && order[key] > post) {
      post = order[key];
    }
  }
  const imageNumber = post.toString()

  if (imageNumber === '1' && !startTime) {
    startTime = new Date().getTime();
  }

  if (imageNumber === '2' && scoreboard[0]['sensor1'].time === 0) {
    let actualTime = new Date().getTime();
    const sensor1Delta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      sensor1: {
        detected: true,
        time: sensor1Delta,
        distance: scoreboard[0]['sensor1'].distance
      },
    })
    .then(() => console.log('Sensor 1 delta updated'))
    .catch((error) => console.error('Error updating sensor 1 delta:', error));
  }

  if (imageNumber === '3' && scoreboard[0]['sensor2'].time === 0) {
    let actualTime = new Date().getTime();
    const sensor2Delta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      sensor2: {
        detected: true,
        time: sensor2Delta,
        distance: scoreboard[0]['sensor2'].distance
      },
    })
    .then(() => console.log('Sensor 2 delta updated'))
    .catch((error) => console.error('Error updating sensor 2 delta:', error));
  }

  if (imageNumber === '4' && scoreboard[0]['sensor3'].time === 0) {
    let actualTime = new Date().getTime();
    const sensor3Delta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      sensor3: {
        detected: true,
        time: sensor3Delta,
        distance: scoreboard[0]['sensor3'].distance
      },
    })
    .then(() => console.log('Sensor 3 delta updated'))
    .catch((error) => console.error('Error updating sensor 3 delta:', error));
  }

  if (imageNumber === '5' && scoreboard[0]['sensor4'].time === 0) {
    let actualTime = new Date().getTime();
    const sensor4Delta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      sensor4: {
        detected: true,
        time: sensor4Delta,
        distance: scoreboard[0]['sensor4'].distance
      },
    })
    .then(() => console.log('Sensor 4 delta updated'))
    .catch((error) => console.error('Error updating sensor 4 delta:', error));
  }

  if (imageNumber === '6' && scoreboard[0]['sensor5'].time === 0) {
    let actualTime = new Date().getTime();
    const sensor5Delta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      sensor5: {
        detected: true,
        time: sensor5Delta,
        distance: scoreboard[0]['sensor5'].distance
      },
    })
    .then(() => console.log('Sensor 5 delta updated'))
    .catch((error) => console.error('Error updating sensor 5 delta:', error));
  }

  if (imageNumber === '7' && scoreboard[0]['sensor6'].time === 0) {
    let actualTime = new Date().getTime();
    const sensor6Delta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      sensor6: {
        detected: true,
        time: sensor6Delta,
        distance: scoreboard[0]['sensor6'].distance
      },
    })
    .then(() => console.log('Sensor 6 delta updated'))
    .catch((error) => console.error('Error updating sensor 6 delta:', error));
  }

  if (imageNumber === '8' && scoreboard[0]['end'].time === 0) {
    let actualTime = new Date().getTime();
    const endDelta = actualTime - startTime;

    db.collection('competitors')
    .doc(scoreboard[0].id)
    .update({
      end: {
        detected: true,
        time: endDelta,
        distance: scoreboard[0]['end'].distance
      },
    })
    .then(() => console.log('end delta updated'))
    .catch((error) => console.error('Error updating end delta:', error));
  }
  res.render('scoreboard', { scoreboard, imageNumber });
});

app.post('/reset/:id', (req, res) => {
  const competitorId = req.params.id;
  db.collection('competitors')
    .doc(competitorId)
    .update({
      start: { detected: false, time: 0 },
      sensor1: { detected: false, time: 0, distance: 0 },
      sensor2: { detected: false, time: 0, distance: 0 },
      sensor3: { detected: false, time: 0, distance: 0 },
      sensor4: { detected: false, time: 0, distance: 0 },
      sensor5: { detected: false, time: 0, distance: 0 },
      sensor6: { detected: false, time: 0, distance: 0 },
      end: { detected: false, time: 0 },
    })
    .then(() => {
      console.log(`Competitor ${competitorId} reset`);
      res.redirect('/');
    })
    .catch((error) => {
      console.error(`Error resetting competitor ${competitorId}:`, error);
      res.status(500).send(`Error resetting competitor ${competitorId}`);
    });
});

app.listen(webAppPort, () => {
    console.log(`Server listening at http://localhost:${webAppPort}`);
});


extraInfoApp.use(express.urlencoded({ extended: true }));

extraInfoApp.post('/', (req, res) => {
  const { sensorId, distanceValue } = req.body;
  const competitorId = "Fcs6LtbWlwdzspcVB6TY";
  console.log(sensorId, distanceValue)
  db.collection('competitors')
    .doc(competitorId)
    .update({
      [`${sensorId}.distance`]: distanceValue
    })
    .then(() => {
      console.log(`${sensorId} set distance`);
      res.redirect('/');
    })
    .catch((error) => {
      console.error(`Error setting distance from  ${sensorId}:`, error);
      res.status(500).send(`Error setting competitor ${sensorId}`);
    });
});

extraInfoApp.listen(extraInfoPort, () => {
  console.log(`Server listening at http://localhost:${extraInfoPort}`);
});
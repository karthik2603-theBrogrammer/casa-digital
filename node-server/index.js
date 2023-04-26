const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const { db } = require("./firebaseConfig");
const { collection, addDoc, doc, onSnapshot } = require("firebase/firestore");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 7000;

const docRef = doc(db, "admin", "cZBCRUvrSiVpopbws3nF");
onSnapshot(
  docRef,
  async (doc) => {
    if (doc.exists()) {
      const userData = doc.data();
      // Call your function here with the updated data
      // implementing the lock and key
      if (doc.data().validEntry === 0) {
        console.log("Red LED");
        const { data } = await axios.post("http://192.168.190.239/redledon");
        console.log(data)

      } else {
        console.log("Green LED");
        const { data } = await axios.post("http://192.168.190.239/greenledon");
        console.log(data)
      }
      console.log("Document updated:", userData);
    } else {
      console.log("Document does not exist");
    }
  },
  (error) => {
    console.error("Error listening for document changes:", error);
  }
);

app.get("/", async (req, res) => {
  res.status(200).send("Request Got!");
});

app.get("/ledon", async (req, res) => {
  // Send an HTTP request to the Arduino to turn on the LED
  const { data } = await axios.post("http://192.168.139.239/ledon");
  console.log(data);
  res.send(data);
});
app.get("/on", async (req, res) => {
  // Send an HTTP request to the Arduino to turn on the LED
  const { data } = await axios.post("http://192.168.139.239/ledof");
  console.log(data);
  res.send(data);
});
app.post("/gashigh", async (req, res) => {
  const { smokeValue } = req.body;
  console.log(req.body);
  const docRef = await addDoc(collection(db, "gas-high-details"), {
    information: "Gas Leakage Detected!",
    ttc: Date.now(),
    time: `${new Date().toLocaleTimeString()}`,
    smokeValue: smokeValue,
  });
  console.log(docRef.id, docRef.path);
  res.status(200).send("OK");
});
app.post("/temperature", async (req, res) => {
  const { situation, temperature } = req.body;
  console.log(req.body);
  const docRef = await addDoc(collection(db, "temp-details"), {
    information: situation,
    ttc: Date.now(),
    time: `${new Date().toLocaleTimeString()}`,
    temperature: temperature,
  });
  console.log(docRef.id, docRef.path);
  res.status(200).send("OK");
});

app.post("/sendToCloud", async (req, res) => {
  console.log(req.body);
  const { detail, value } = req.body;
  switch (detail) {
    case "Gas":
      if (value > 375) {
        const smokeDocRef = await addDoc(collection(db, "gas-high-details"), {
          information: "Gas Leakage Detected!",
          ttc: Date.now(),
          time: `${new Date().toLocaleTimeString()}`,
          smokeValue: value,
        });
        console.log(smokeDocRef.id, smokeDocRef.path);
      }
      break;
    case "Temperature":
      const tempDocRef = await addDoc(collection(db, "temp-details"), {
        information: "Current Temperature!",
        ttc: Date.now(),
        time: `${new Date().toLocaleTimeString()}`,
        temperature: value,
      });
      console.log(tempDocRef.id, tempDocRef.path);
      break;
    case "Water Level":
      const { situation } = req.body;
      if(situation == 'EMPTY'){
        waterLevelFromSensor = 0;
      }
      const waterDocRef = await addDoc(collection(db, "water-level-details"), {
        information: "Water Level!",
        ttc: Date.now(),
        time: `${new Date().toLocaleTimeString()}`,
        situation: situation,
        waterLevel: (situation === 'EMPTY' ? 0 : value) ,
      });
      console.log(waterDocRef.id, waterDocRef.path);
    // case "Motion Detected":
    //   const motionDoc = await addDoc(
    //     collection(db, "motion-detected-details"),
    //     {
    //       information: "Motion Detected!",
    //       ttc: Date.now(),
    //       time: `${new Date().toLocaleTimeString()}`,
    //     }
    //   );
    //   console.log(motionDoc.id, motionDoc.path);
    default:
      break;
  }
  res.status(200).send("Request Got!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

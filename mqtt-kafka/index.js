const mqtt = require("mqtt");
const { v4: uuidv4 } = require('uuid');
const { kafka } = require("../kafka");
const fs = require('fs/promises');

const mqttServer = "mqtt://broker.hivemq.com";
const client = mqtt.connect(mqttServer);

const init = async () => {
  try {
    const jsonFilePath = "config.json";
    const data = await fs.readFile(jsonFilePath, "utf8");
    const jsonFileData = JSON.parse(data);
    console.log(jsonFileData);
    return jsonFileData;
  } catch (err) {
    console.error("Error reading JSON file:", err);
    throw err;
  }
};

const configData = init().then((res) => {
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  
    // Subscribe to topics dynamically based on config
    res.topics.forEach((topic) => {
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error(`Failed to subscribe to topic: ${topic}`);
        }
      });
    });
  });
  
});

const initKafka = () => {
  const producer = kafka.producer();
  console.log("Kafka Connecting ..");
  producer.connect();
  console.log('Kafka Producer connected !');
  return producer;
};

const kafkaProducer = initKafka();
console.log(configData)

let lastDataReceivedTime = Date.now();
const noDataThreshold = 10000;



client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  const data = JSON.parse(message.toString());
  lastDataReceivedTime = Date.now();
  console.log({ Status: "Casa Digital Connection Established !" });
  data['CurrentDate'] = lastDataReceivedTime;

  kafkaProducer.send({
    topic: topic,
    messages: [{
      partition: 0,
      key: uuidv4(),
      value: JSON.stringify(data),
    }]
  });
});

client.on("error", (err) => {
  console.error("MQTT error:", err);
});

client.on("close", () => {
  console.log("Connection to MQTT broker closed");
});

client.on("offline", () => {
  console.log("MQTT client is offline");
});

// Check for no data received and log status
setInterval(() => {
  const currentTime = Date.now();
  if (currentTime - lastDataReceivedTime > noDataThreshold) {
    console.log({ Status: "Casa Digital Connection Poor ! Check Network ?" });
  }
}, 10000); // Check every 1 second

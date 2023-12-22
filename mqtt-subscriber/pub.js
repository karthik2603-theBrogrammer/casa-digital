const mqtt = require("mqtt");

// const brokerUrl = "mqtt://172.19.0.2:1883"; // Replace with your MQTT broker address
const brokerUrl = 'mqtt://broker.hivemq.com'
const topic = "test_topic";

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
    console.log("Connected Finally Bro !")
  setInterval(() => {
    const message = `Hello, MQTT! ${new Date()}`;
    client.publish(topic, message);
    console.log(`Published: ${message}`);
  }, 2000); // Publish a message every 2 seconds
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

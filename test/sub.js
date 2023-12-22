const mqtt = require('mqtt');

const brokerUrl = 'mqtt://broker.hivemq.com'; // Replace with your MQTT broker address
const topic = 'test_topic';

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error(`Failed to subscribe to topic: ${topic}`);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

client.on('error', (err) => {
  console.error('MQTT error:', err);
});

client.on('close', () => {
  console.log('Connection to MQTT broker closed');
});

client.on('offline', () => {
  console.log('MQTT client is offline');
});

const mqtt = require('mqtt');
const mqttServer = 'mqtt://broker.hivemq.com';  // Replace with your MQTT broker address
const mqttTopic = 'gas_sensor_data';     // Replace with your sensor topic
const client = mqtt.connect(mqttServer);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(mqttTopic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${mqttTopic}`);
    } else {
      console.error(`Failed to subscribe to topic: ${mqttTopic}`);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  var data = JSON.parse(message.toString())
  console.log(data)
  // Add your logic to save the data to a database or perform any other actions
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

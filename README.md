# Casa Digital 🖥️🏡

<img width="853" alt="Screenshot 2023-12-25 at 1 12 58 AM" src="https://github.com/karthik2603-theBrogrammer/casa-digital/assets/103726023/133b443f-2c7d-4b56-b3ff-47e79deea065">



Casa Digital is a real-time IoT data monitoring system designed for smart home purposes. It seamlessly connects MQTT sensors, streams data to Kafka, and queues into TimescaleDB for analysis. The system is implemented using Node.js for integration.

## Tech Stack ☎️

- `MQTT`: Message Queuing Telemetry Transport for sensor data communication.
- `Kafka`: Distributed streaming platform for real-time data processing and queuing to timescaleDB.
- `TimescaleDB`: Time-series database for efficient storage and retrieval of sensor data.
- `Node.js`: Runtime environment for executing JavaScript code on the server-side.

## How to run the project ? 🏃‍♀️


1. Clone the Repository:
```
git clone https://github.com/your-username/your-repo.git
```
2. Modify the ```config.json``` file in the root, as per your needs.
```
{
  "topics": [
    "gas_sensor_data", // Enter your desired topics here.
    "temperature_data",

  ],
  "kafka": {  
    "bootstrap_servers": "localhost:9092" // Local host and port of kafka.
  },
"mqttBroker": {
    "bootstrap_servers": "mqtt://broker.hivemq.com" // Default Broker, configured in docker-compose file.
  },
  "docker": {
    "timescale_config": {
      "user": "postgres",
      "password": "password", // IMP: password here has to match docker-compose file !
      "host": "localhost",
      "port": "5432",
      "database": "postgres"
    }
  }
}
```
3. Run the ```docker-compose``` File.
- Maintain the same password for timescale ! 
```
docker-compose up -d
```
   
<img width="1146" alt="Screenshot 2023-12-25 at 1 35 04 AM" src="https://github.com/karthik2603-theBrogrammer/casa-digital/assets/103726023/2efa99ba-9445-409e-9dbb-912c53335bce">

4. Configure Your IOT devices to their respective ports.
```NOTE: For more device connectivity use serial communication between 2 microcontrollers. (Ex: Arduino and ESP8266)```
- Once the device codes have been loaded with the same topics proceed.
6. Run the Kafka Consumer.

```
cd sink
node index.js
```

6. Run the MQTT-Kafka pair.
- MQTT will listen to the network of IOT devices and sensors.
- Then kafka will feed the data into the brokers in its respective topics.

```
cd mqtt-kafka
node index.js
```

7. Watch the streaming of data into ```timescaleDB``` with an interactive CLI.
```
cd cli
pip3 install -r requirements.txt
python3 index.py
```


8. To interact with timescale directly,

```
docker exec -it timescaledb psql -U postgres
```

<img width="914" alt="Screenshot 2023-12-25 at 1 46 07 AM" src="https://github.com/karthik2603-theBrogrammer/casa-digital/assets/103726023/a692d769-18db-4bc1-aec5-1617df9c4b87">


## Contributing
- I have learnt a lot developing this project of mine, it may not be the best but i gave it my all nevertheless :)
- Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## 🚀
<img width="423" height = "300" alt="Screenshot 2023-12-25 at 1 12 58 AM" src="https://github.com/karthik2603-theBrogrammer/casa-digital/assets/103726023/591bef13-ab3c-4b5c-9c93-bd92c51c3c04">

# CasaDigital Home Automation 
This automated system makes use of 2 microcontrollers ESP8266 as well as Aduino UNO. Via Serial Communication, The sensors(Connected To Arduino) transfer data to the ESP, and through wifi connectivity, updates to the Firestore database via a node server. Observations Such as the High temperature, Low Water content inside the overhead tank, motion detection on unauthorized entery and high gas levels (Kitchen Gas) are notified to the user instantly at real time via the web user interface. 

## Sensors Used
LM35 Temperature Sensor, MQ3 Gas Sensor, Water Sensor and PIR Motion Sensor.

## Technologies
ESP8266, Arduino UNO, Node.js, Firebase and React.

# Steps to Run the Project !

1. 
```
docker-compose up -d 
docker-compose logs -f
```
- To run the docker compose file, pulls all necessary images needed.
- Check the logs of the running image.

else pull and run the image for mqtt given by hive MQ.
- 
```
docker run --name hivemq-ce -d -p 1883:1883 hivemq/hivemq-ce
```
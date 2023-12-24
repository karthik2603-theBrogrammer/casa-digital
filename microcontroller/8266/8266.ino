#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these values with your WiFi credentials
const char* ssid = "<NETWORK_NAME_HERE>";
const char* password = "<NETWORK_PASSWORD_HERE>";

const char* mqttServer = "broker.hivemq.com";  // Update with the IP of your MQTT broker
const int mqttPort = 1883;
const char* mqttTemperatureTopic = "temperature_data";
const char* mqttGasSensorTopic = "gas_sensor_data";
const char* mqttWaterLeveltopic = "water_level_topic";
const char* casaDigitalStatus = "casa_digital_status";

const int lm35SensorPin = A0;  // Temperature sensor pin
const int gasSensorPin = A0;   // Gas sensor pin
const int networkEstablished = D5; // LED to show connection to Wifi Network Successful.

float R0 = 10.0;

WiFiClient espClient;
PubSubClient client(espClient);

bool publishTemperature = true;  
// Set this flag to switch between temperature and gas sensor data
// Can be modified to add more sensors, project scalable for Water Tank Sensor and buzzer. 

void setup() {
  pinMode(lm35SensorPin, INPUT);
  pinMode(gasSensorPin, INPUT);
  pinMode(networkEstablished, OUTPUT);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.begin(115200);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  digitalWrite(networkEstablished, HIGH);
  Serial.println(WiFi.localIP());
  client.setServer(mqttServer, mqttPort);
}
void reconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    if (client.connect("ESP8266Client")) {
      Serial.println("Connected to MQTT broker");
      break;
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" Try again in 5 seconds");
      delay(1000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  static unsigned long lastTemperatureReadTime = 0;
  static unsigned long lastGasReadTime = 0;

  if (publishTemperature && millis() - lastTemperatureReadTime >= 200) {
    int sensorValue = analogRead(lm35SensorPin);
    float temperature = (sensorValue *5);  // LM35 sensor output is in mV per degree Celsius

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");

    // Send temperature data to MQTT topic
    char payload[50];
    sprintf(payload, "{\"temperature\": %.2f}", temperature);
    client.publish(mqttTemperatureTopic, payload);

    lastTemperatureReadTime = millis();
  } else if (!publishTemperature && millis() - lastGasReadTime >= 2000) {
    int sensorValue = analogRead(gasSensorPin);
    float sensorVolt = sensorValue / 1024.0 * 5.0;
    float RS_gas = (5.0 - sensorVolt) / sensorVolt;
    float ratio = RS_gas / R0;

    Serial.print("Sensor Voltage: ");
    Serial.print(sensorVolt);
    Serial.println(" V");
    Serial.print("RS (Sensor Resistance in Gas): ");
    Serial.println(RS_gas);
    Serial.print("Ratio (RS/R0): ");
    Serial.println(ratio);

    char payload[50];
    sprintf(payload, "{\"voltage\": %.2f, \"resistance\": %.2f, \"ratio\": %.2f}", sensorVolt, RS_gas, static_cast<double>(ratio));
    client.publish(mqttGasSensorTopic, payload);

    lastGasReadTime = millis();
  }
}

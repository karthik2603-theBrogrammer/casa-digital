#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these values with your WiFi credentials
const char* ssid = "<NETWORK_NAME>";
const char* password = "<NETWORK_PASSWORD>";

const char* mqttServer = "<BROKER_NAME>";  
// Project uses Hiver hence,  == broker.hivemq.com
const int mqttPort = 1883;
const char* mqttTopic = "gas_sensor_data";

const int gasSensorPin = A0;
float R0 = 10.0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  pinMode(gasSensorPin, INPUT);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.begin(115200);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());

  client.setServer(mqttServer, mqttPort);
}

void reconnect() {
  // Loop until we're reconnected to the MQTT broker
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");

    // Attempt to connect
    if (client.connect("ESP8266Client")) {
      Serial.println("Connected to MQTT broker");
      break;

      // Add a delay before attempting to reconnect
      delay(5000);
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" Try again in 5 seconds");
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  static unsigned long lastGasReadTime = 0;
  if (millis() - lastGasReadTime >= 2000) {
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

    // Send sensor data to MQTT topic
    char payload[50];
sprintf(payload, "{\"voltage\": %.2f, \"resistance\": %.2f, \"ratio\": %.2f}", sensorVolt, RS_gas, static_cast<double>(ratio));

    client.publish(mqttTopic, payload);

    lastGasReadTime = millis();
  }

  // Additional loop logic can be added if needed
}

#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "your_wifi_name";
const char* password = "your_wifi_password ";

const char* serverName = "http://10.28.232.80:5000/data";

const int soilPin = 34;   // AO → GPIO34 / VP

void setup() {
  Serial.begin(115200);
  pinMode(soilPin, INPUT);

  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi Connected!");

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  int moisture = analogRead(soilPin);

  Serial.print("Soil Moisture: ");
  Serial.println(moisture);

  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;

    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{\"moisture\":" + String(moisture) + "}";

    int responseCode = http.POST(jsonData);

    Serial.print("HTTP Response Code: ");
    Serial.println(responseCode);

    http.end();

  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(5000);
}

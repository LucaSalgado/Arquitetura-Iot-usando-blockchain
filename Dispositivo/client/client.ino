#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <vector>

// Defines - mapeamento de pinos do NodeMCU
#define D2 4
#define D7 13
#define D0 16

// Configurar Wi-fi
const char* ssid = "Teste";
const char* password = "teste123";
const char* server = "http://192.168.100.26:3000/aprovados";

// Vector para armazenar os endereços recebidos
std::vector<String> enderecos;

void conectar_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Endereco de IP: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("");
  Serial.println("Leitura do botão");
  pinMode(D7, INPUT);
  pinMode(D2, INPUT);
  pinMode(D0, OUTPUT);
  digitalWrite(D0, LOW);
  conectar_wifi();
}

void Receber() {
  WiFiClient client;
  HTTPClient http;
  Serial.print("[HTTP] iniciando...\n");
  if (http.begin(client, server)) {
    Serial.print("[HTTP] GET...\n");
    int httpCode = http.GET();
    if (httpCode > 0) {
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String payload = http.getString();
        Serial.println(payload);
        // Limpar o vetor antes de adicionar novos endereços
        enderecos.clear();

        // Processar e armazenar os endereços no vetor
        int startPos = payload.indexOf("[\"");
        int endPos = payload.indexOf("\"]");
        if (startPos != -1 && endPos != -1) {
          String enderecoStr = payload.substring(startPos + 2, endPos);
          int separatorPos = 0;
          do {
            separatorPos = enderecoStr.indexOf(',');
            if (separatorPos != -1) {
              enderecos.push_back(enderecoStr.substring(0, separatorPos));
              enderecoStr.remove(0, separatorPos + 1);
            } else {
              enderecos.push_back(enderecoStr);
            }
          } while (separatorPos != -1);
        }
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.println("[HTTP] Unable to connect");
  }
}

void Enviar(String endereco) {
  
  // Ajustando as strings dos endereços
  endereco.replace("\"", "");
 
  // Enviar uma string de teste para os endereços no vetor

  WiFiClient client;
  HTTPClient http;

  Serial.printf("[HTTP] Enviando para: %s\n", endereco.c_str());

  // Ajuste a string de teste conforme necessário
  String teste = "{\"mensagem\": \"Teste de mensagem\"}";

  if (http.begin(client, endereco)) {
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(teste);
    if (httpCode > 0) {
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.println("[HTTP] Unable to connect");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (digitalRead(D7) == HIGH) {
    Serial.println("Botão Receber pressionado");
    Receber();
    while (digitalRead(D7) == HIGH) {}
  }
  if (digitalRead(D2) == HIGH) {
    Serial.println("Botão Enviar pressionado");
    for (const auto& endereco : enderecos) {
      Enviar(endereco);
    }
    while (digitalRead(D2) == HIGH) {}
  }
}

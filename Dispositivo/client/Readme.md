# Dispositivo IoT

Aqui está o código desenvolvido em C++ utilizando a Arduino IDE para programar um ESP8266 para simular o funcionamento compatível com a arquitetura.

# Dependências

* [Arduino IDE](https://docs.arduino.cc/software/ide-v2)
* [Arduino core for ESP8266WiFi chip](https://github.com/esp8266/Arduino)

# Componentes utilizados

* Um modulo NodeMCU ESP8266
* Dois Push Buttons (Chave Táctil)
* Dois resistor de 10k Ohm
* Cinco Jumpers
* Um protoboard

# Esquema de ligação dos componentes

# Funcionamento

Configure o código com os dados corretos de conexão WiFi 2.4Ghz da rede que você queira se conectar e o endereço da API que se comunicará com a Ethereum Client API desejada.

Após a configuração, o botão conectado ao pino D7 ao ser pressionado fará uma requisição GET a API esperando receber de volta uma lista com os endereços das API dos médicos.

O outro botão conectado ao pino D2 ao ser pressionado fará uma requisição POST em cada um dos endereços de API recebidos enviando os dados desejados.
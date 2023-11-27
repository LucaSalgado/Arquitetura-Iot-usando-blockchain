# Médico API

Está API é um exemplo de uma API simples que pode ser usada pelos médicos para receber os dados enviados pelo dispositivo médico.

# Dependências

* [NodeJs](https://nodejs.org/en)
* [Express](https://expressjs.com)

# Funcionamento
Execute o seguinte comando no terminal para iniciar a API:
```node index.js```

# Endpoints

* ```/```: é o endpoint padrão se requisitado usando ```GET``` irá retornar uma saudação a API.

* ```/enviar```: é o endpoint de requisição usado pelo dispositivo para enviar os dados. Ao usar ```POST``` será enviado um json em formato de string.
# Ethereum API

Está API tem a finalidade de se comunicar com o Ethereum Client API (Infura) possibilitando a interação do dispositivo médico ao contrato inteligente.

# Dependências

* [NodeJs](https://nodejs.org/en)
* [Express](https://expressjs.com)
* [Ethers](https://ethers.org) 
* Endereço com chave de acesso a API do Ethereum client [Infura](https://www.infura.io)

# Funcionamento

Para que a API funcione, é necessário atualizar as seguintes variáveis do arquivo ```.env```:

* ENDERECO: essa variável armazena o endereço do contrato inteligente na rede Ethereum.

* IKEY: essa variável armazena a chave privada da API do Infura usada para fazer as requisições ao contrato.

* ABI: essa variável armazena a especificação do contrato codificada seguindo o padrão estabelecido pela rede Ethereum.

Execute o seguinte comando no terminal para iniciar a API:
```node index.js```

# Endpoints

* ```/```: é o endpoint padrão se requisitado usando ```GET``` irá retornar uma saudação a API.

* ```/aprovados```: é o endpoint de requisição aos endereços aprovados usado pelo dispositivo. Ao usar ```GET``` será retornado uma string.

# Médico Dapp

Este é o aplicativo descentralizado utilizado pelo médico, seu objetivo é permitir ao médico cadastrar suas APIs para receber os dados vindo do dispositivos e acompanhar a aprovação do seu registro de API.

# Dependências

* [NodeJs](https://nodejs.org/en)
* [Ethers](https://ethers.org)
* [Connect](https://github.com/senchalabs/connect)
* [serve-static](https://github.com/expressjs/serve-static)
* Extensão de navegador do [MetaMask](https://metamask.io).

# Funcionamento

Antes de executar o comando para iniciar a Dapp, altere a variável ```ENDERECO``` no arquivo ```index.js``` para o endereco do contrato inteligente que você esteja usando.

Execute o seguinte comando no terminal para iniciar a Dapp:

```node index.js```

A Dapp estará rodando em ```localhost:3000```

O médico terá acesso a um pequeno formulário onde ele poderá cadastrar o endereço e a validade de sua API. Além de poder listar as APIs pendentes e aprovadas.

# Eventos

A Dapp tem acesso ao seguintes eventos:

* RegistroCriado: Que serve de confirmação da computação da criação do registro na API.
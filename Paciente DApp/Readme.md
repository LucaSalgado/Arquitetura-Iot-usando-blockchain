# Paciente Dapp

Este é o aplicativo descentralizado utilizado pelo médico, seu objetivo é permitir ao médico cadastrar suas APIs para receber os dados vindo do dispositivos e acompanhar a aprovação do seu registro de API.

# Dependências

* [NodeJs](https://nodejs.org/en)
* [Ethers](https://ethers.org)
* [Connect](https://github.com/senchalabs/connect)
* [serve-static](https://github.com/expressjs/serve-static)
* Extensão de navegador do [MetaMask](https://metamask.io).

# Funcionamento

Antes de executar o comando para iniciar a Dapp, altere a variável ```ENDERECO``` no arquivo ```index.js``` para o endereço do contrato inteligente que você esteja usando.

Execute o seguinte comando no terminal para iniciar a Dapp:

```node index.js```

A Dapp estará rodando em ```localhost:3000```

O paciente terá acesso as funcionalidades de:
* listar as APIs pendentes e aprovados
* aprovar ou reprovar uma API
* revogar uma API aprovada
* remover as APIs com validade expirados

# Eventos

A Dapp tem acesso ao seguintes eventos:

* RegistroAprovado: Que serve de confirmação da computação da aprovação do registro da API.

* RegistroReprovado: Que serve de confirmação da computação da reprovação do registro da API.

* AprovacaoRevogada: Que serve de confirmação da computação da revogação da aprovação do registro da API.
# Modelo de Arquitetura IoT para Dispositivos Médicos Usando Contratos Inteligentes

Este o um modelo de arquitetura elaborado para observar os desafios enfrentados por arquiteturas IoT que utilizam dispositivos de baixo poder computacional para interagir com contratos inteligentes na rede Ethereum.

Este projeto utiliza o cenário de dispositivos médicos como estudo de caso de uma possível aplicação do modelo de arquitetura.

> **Atenção:** não utilize este projeto no formato em que está para aplicações no mundo real. Este projeto foi elaborado sem qualquer implementação de métodos de segurança e privacidade.

# Composição

Este repositório é composto pelos seguintes componentes:

* O contrato inteligente escrito em [Solidity](https://soliditylang.org) na versão 0.8.20
* O código para o dispositivo médico (foi usado um NodeMCU ESP8266 como dispositivo médico) escrito em C++ usando a [Arduino IDE](https://docs.arduino.cc/software/ide-v2)
* Uma API em [NodeJs](https://nodejs.org/en), [Express](https://expressjs.com) e [Ethers](https://ethers.org) para a comunicação do dispositivo médico com a API do Ethereum client [Infura](https://www.infura.io)
* Uma API de exemplo para uso do médico em [NodeJs](https://nodejs.org/en) e [Express](https://expressjs.com)
* Uma Dapp para uso do médico escrita usando [NodeJs](https://nodejs.org/en), [Ethers](https://ethers.org), [Connect](https://github.com/senchalabs/connect) e [serve-static](https://github.com/expressjs/serve-static)
* Uma Dapp para uso do paciente escrita usando [NodeJs](https://nodejs.org/en), [Ethers](https://ethers.org), [Connect](https://github.com/senchalabs/connect) e [serve-static](https://github.com/expressjs/serve-static)

# USO

Cada componente possui o seu próprio arquivo Readme que deve ser lido.

# Contribuição ao/Manutenção do Projeto

> **Atenção:** Este repositório não será mantido; não espere por atualizações ou correções de bugs. Caso queira contribuir corrigindo erros, adicionando funcionalidades ou atualizando código, por favor, entre em contato pela redes sociais listadas no perfil ou pelo email: [lucas@salgado.dev](lucas@salgado.dev).
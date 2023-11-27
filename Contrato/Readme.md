# Gerenciador de Registros de API

Este contrato inteligente tem o objetivo de armazenar e gerenciar as APIs utilizadas pelos dispositivos médicos utilizando blockchain.

# Dependências

* [Solidity](https://soliditylang.org) na versão 0.8.20
* [Remix IDE](https://remix.ethereum.org)

> Foi utilizado a versão online do Remix IDE para a construção, testes e deploy deste contrato, sendo assim, fica aqui a minha recomendação da utilização desta IDE.

# Funcionalidades

### criaRegistro

Função que possui como argumentos o endereço da API que se deseja cadastrar e a duração do cadastro em dias.

É criado um registro que fica armazenado em uma lista de registros pendentes.

### aprovarRegistro

Função que exige cargo de administrador para poder chamar.

A função possui o endereço da API que se deseja aprovar o registro como argumento.

O registro pendente é removido da lista e enviado a lista de registros aprovados, junto é definido o timestamp atual do bloco em que o pedido de registro foi enviado.

### reprovarRegistro

Função que exige cargo de administrador para poder chamar.

Função possui como argumento o endereço da API que possui registro cadastrado na lista de pendentes.

A função remove o registro da lista de pendentes.

### revogarAprovacaoRegistro

Função que exige cargo de administrador para poder chamar.

Função que possui como argumento o endereço da API que possui registro aprovado.

A função remove o registro da lista de registros aprovados mesmo que o registro ainda esteja em seu período ativo.

### removerRegistrosExpirados

Função que percorre a lista de registros ativos e remove todos os registros que tenha sua validade expirada, ou seja, que o timestamp atual do bloco seja maior que o timestamp do bloco da aprovação do registro + o equivalente da duração em dias em milissegundos.

### obterRegistrosPendentes

Função que retorna uma lista com todos os endereços de API registrados na lista de pendentes.

### obterRegistrosAprovados

Função que retorna uma lista com todos os endereços de API registrados na lista de aprovados.
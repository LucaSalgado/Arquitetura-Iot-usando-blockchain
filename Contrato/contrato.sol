// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract GerenciadorRegistros is AccessControl {
    // Criando variáveis e estruturas
    struct Registro {
        string endereco; // Endereço HTTP da API
        uint256 data; // Data da aprovação do registro da API
        uint256 validade; // Validade em dias do registro ativo
    }
    mapping(string => Registro) private registrosPendentes;
    mapping(string => Registro) private registrosAprovados;
    string[] public chavesAprovadas;
    string[] private chavesPendentes;

    bytes32 public constant ADMIN = keccak256("Admin");

    // Criando eventos
    event RegistroCriado(string endereco);
    event RegistroAprovado(string endereco);
    event RegistroReprovado(string endereco);
    event AprovacaoRevogada(string endereco);

    constructor() {
        _grantRole(ADMIN, msg.sender);
    }

    function criarRegistro(
        string calldata endereco,
        uint256 validade
    ) public {
        // Verifica se o registro já foi criado
        require(
            registrosPendentes[endereco].validade == 0,
            "Registro ja criado"
        );

        // Cria novo Registro
        registrosPendentes[endereco] = Registro({
            endereco: endereco,
            data: 0,
            validade: validade
        });
        chavesPendentes.push(endereco);

        emit RegistroCriado(endereco);
    }

    function aprovarRegitro(string calldata endereco) external {
        require(
            hasRole(ADMIN, msg.sender),
            "Voce nao tem permissao para aprovar registros de APIs"
        );
        Registro memory registro = registrosPendentes[endereco];
        require(
            bytes(registro.endereco).length > 0,
            "Nenhum pedido de registro para este endereco de API"
        );

        // Adiciona o registro aprovado a lista de APIs aprovadas
        registrosAprovados[endereco] = Registro({
            endereco: registro.endereco,
            data: block.timestamp,
            validade: registro.validade
        });
        chavesAprovadas.push(registro.endereco);

        // Remove o registro da lista de registro pendentes
        delete registrosPendentes[endereco];

        // Remove a chave da lista de chaves pendentes
        uint256 i = encontrarChave(endereco, chavesPendentes);
        removeChave(i, chavesPendentes);

        emit RegistroAprovado(registro.endereco);
    }

    function revogarAprovacaoRegistro(string calldata endereco) external {
        require(
            hasRole(ADMIN, msg.sender),
            "Voce nao tem permissao para aprovar registros de APIs"
        );
        Registro memory registro = registrosAprovados[endereco];
        require(
            bytes(registro.endereco).length > 0,
            "Nenhum registro aprovado para este endereco de API"
        );

        // Remove o registro da lista de registros aprovados
        delete registrosAprovados[endereco];

        // Remove a chave da lista de chaves Aprovadas
        uint256 i = encontrarChave(endereco, chavesAprovadas);
        removeChave(i, chavesAprovadas);

        emit AprovacaoRevogada(registro.endereco);

    } 

    function reprovarRegistro(string calldata endereco) external {
        require(
            hasRole(ADMIN, msg.sender),
            "Voce nao tem permissao para aprovar registros de APIs"
        );
        Registro memory registro = registrosPendentes[endereco];
        require(
            bytes(registro.endereco).length > 0,
            "Nenhum pedido de registro para este endereco de API"
        );

        // Remove o registro da lista de registros pendentes
        delete registrosPendentes[endereco];

        // Remove a chave da lista de chaves pendentes
        uint256 i = encontrarChave(endereco, chavesPendentes);
        removeChave(i, chavesPendentes);

        emit RegistroReprovado(registro.endereco);
    }

    function encontrarChave(string calldata endereco, string[] storage array) private view returns(uint256) {
        for (uint256 i = 0; i < array.length; i++) {
            if(keccak256(abi.encodePacked(array[i])) == keccak256(abi.encodePacked(endereco))){
                return i;
            }
        }
        revert("Nao foi possivel encontrar a chave do endereco");
    }

    function removeChave(uint256 index, string[] storage array) private {
        require(index < array.length, "Indice fora dos limites");

        for (uint256 i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.pop();
    }

    function removerRegistrosExpirados() public {
        for (uint256 i = 0; i < chavesAprovadas.length; i++) {
            if (
                block.timestamp >=
                registrosAprovados[chavesAprovadas[i]].data +
                    registrosAprovados[chavesAprovadas[i]].validade *
                    1 days
            ) {
                delete registrosAprovados[chavesAprovadas[i]];
                removeChave(i, chavesAprovadas);
            }
        }
    }

    function obterRegistrosPendentes() public view returns (string[] memory) {
        require(
            hasRole(ADMIN, msg.sender),
            "Voce nao tem permissao para ler a lista de registros de APIs pendentes"
        );

        return chavesPendentes;
    }

    function obterRegistrosAprovados() public view returns (string[] memory) {
        require(
            chavesAprovadas.length > 0,
            "Nao ha registros a serem retornados"
        );

        return chavesAprovadas;
    }

}

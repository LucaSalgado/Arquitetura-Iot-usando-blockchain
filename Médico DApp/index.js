import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
// Constantes de configuração do contrato
const ENDERECO = "0xf23DB50302353B8f63245EfB236121A171B5C343";
const ABI = [
  "function criarRegistro (string calldata endereco,uint256 validade)",
  "function obterRegistrosPendentes() public view returns (string[] memory)",
  "function obterRegistrosAprovados() public view returns (string[] memory)",
  "event RegistroCriado(string endereco)"
];

// Event Listeners
document
  .getElementById("listarPendentesButton")
  .addEventListener("click", () => {
    listarPendentes();
  });

document
  .getElementById("listarAprovadosButton")
  .addEventListener("click", () => {
    listarAprovados();
  });

  document
  .getElementById("criaRegistroButton")
  .addEventListener("click", () => {
    criarRegistro();
  });

// Configurando Ethers
let signer = null; // objeto autenticado com direitos de escrita providos por uma chave privada
let provider; // objeto com direitos de somente leitura da rede Ethereum
async function configWallet() {
  if (window.ethereum == null) {
    console.log(
      "Metamask não foi instalado; usando configuração de somente leitura padrão"
    );
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }
}
await configWallet();

let contractCanPay = new ethers.Contract(ENDERECO, ABI, signer);
let contractReadOnly = new ethers.Contract(ENDERECO, ABI, provider);

let listaPendentes = [];
let listaAprovados = [];

// exibe os eventos emitidos
function displayAlert(message, tempo) {
  const alertContainer = document.getElementById("alert-container");
  const alertCard = document.createElement("div");
  alertCard.classList.add("alert-card");
  alertCard.innerHTML = message;

  alertContainer.appendChild(alertCard);
  alertCard.classList.add("show-alert");

  // remove the alert card after 5 seconds
  setTimeout(() => {
    alertCard.remove();
  }, tempo);
}

// Configura para detectar eventos no contrato inteligente
contractReadOnly.on("RegistroCriado", (endereco) => {
  displayAlert(`A API de endereço: ${endereco} foi aprovada!`,3000);
});

// Funções

function atualizarSelect(selectId, options) {
  const selectElement = document.getElementById(selectId);
  selectElement.innerHTML = ""; // Limpa as opções existentes

  // Adiciona a opção padrão
  const defaultOption = document.createElement("option");
  defaultOption.value = "reset";
  defaultOption.text = "Selecione os Registros";
  selectElement.appendChild(defaultOption);

  // Adiciona as opções da lista
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    selectElement.appendChild(optionElement);
  });
}

async function listarPendentes() {
  try {
    const result = await contractReadOnly.obterRegistrosPendentes();
    console.log(result);
    atualizarSelect("pendentesSelect", result);
    displayAlert("Lista carregada", 3000);
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function listarAprovados() {
  try {
    const result = await contractReadOnly.obterRegistrosAprovados();
    console.log(result);
    atualizarSelect("aprovadosSelect", result);
    displayAlert("Lista carregada", 3000);
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function criarRegistro() {
  var endereco = document.getElementById('endereco').value;
  var validade = document.getElementById('validade').value;
  try {
    const result = await contractCanPay.criarRegistro(endereco, validade);
    console.log("API Registrada");
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}
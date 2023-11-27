import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
// Constantes de configuração do contrato
const ENDERECO = "0xf23DB50302353B8f63245EfB236121A171B5C343";
const ABI = [
  "function aprovarRegitro(string calldata endereco) external",
  "function revogarAprovacaoRegistro(string calldata endereco) external",
  "function reprovarRegistro(string calldata endereco) external",
  "function removerRegistrosExpirados() public",
  "function obterRegistrosPendentes() public view returns (string[] memory)",
  "function obterRegistrosAprovados() public view returns (string[] memory)",
  "event RegistroAprovado(string endereco)",
  "event RegistroReprovado(string endereco)",
  "event AprovacaoRevogada(string endereco)"
];

// Adicione um evento de escuta ao evento change do <select>
const pendentesSelect = document.getElementById("pendentesSelect");
pendentesSelect.addEventListener("change", () => {
  registro = pendentesSelect.value;
  console.log(registro);
});

const aprovadosSelect = document.getElementById("aprovadosSelect");
aprovadosSelect.addEventListener("change", () => {
  registro = aprovadosSelect.value;
  console.log(registro);
});

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
  .getElementById("aprovarPendentesButton")
  .addEventListener("click", () => {
    aprovarRegistro();
  });

  document
  .getElementById("reprovarPendentesButton")
  .addEventListener("click", () => {
    reprovarRegistro();
  });

  document
  .getElementById("revogarAprovadosButton")
  .addEventListener("click", () => {
    revogarAprovacaoRegistro();
  });

  document
  .getElementById("removerExpiradosButton")
  .addEventListener("click", () => {
    removerRegistrosExpirados();
  });

  const pendentes = document.getElementById('pendentes');
  const aprovados = document.getElementById('aprovados');

  function mostrar(elemento) {
    elemento.style.display = "block";
  }
  function esconder(elemento) {
    elemento.style.display = "none";
  }

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
let registro = null;

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
contractReadOnly.on("RegistroAprovado", (endereco) => {
  displayAlert(`A API de endereço: ${endereco} foi aprovada!`,3000);
});

contractReadOnly.on("RegistroReprovado", (endereco) => {
  displayAlert(`A API de endereço: ${endereco} foi reprovada!`,3000);
});

contractReadOnly.on("AprovacaoRevogada", (endereco) => {
  displayAlert(`A API de endereço: ${endereco} teve sua aprovação revogada!`,3000);
});

// Funções

function atualizarSelect(selectId, options, card) {
  const selectElement = document.getElementById(selectId);
  selectElement.innerHTML = ""; // Limpa as opções existentes

  // Adiciona a opção padrão
  const defaultOption = document.createElement("option");
  defaultOption.value = "reset";
  defaultOption.text = "Selecione um Registro";
  selectElement.appendChild(defaultOption);

  if(options){
    mostrar(card);
  }

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
    atualizarSelect("pendentesSelect", result, pendentes);
    displayAlert("Lista carregada", 3000);
  } catch (error) {
    console.error(error);
    esconder(pendentes);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function listarAprovados() {
  try {
    const result = await contractReadOnly.obterRegistrosAprovados();
    console.log(result);
    atualizarSelect("aprovadosSelect", result, aprovados);
    displayAlert("Lista carregada", 3000);
  } catch (error) {
    console.error(error);
    esconder(aprovados);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function aprovarRegistro() {
  if(registro == "reset"){
    displayAlert("Selecione uma opção válida!", 3000);
  }
  try {
    const result = await contractCanPay.aprovarRegitro(registro);
    console.log("registro aprovado");
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function reprovarRegistro() {
  if(registro == "reset"){
    displayAlert("Selecione uma opção válida!", 3000);
  }
  try {
    const result = await contractCanPay.reprovarRegitro(registro);
    console.log("registro reprovado");
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function revogarAprovacaoRegistro() {
  if(registro == "reset"){
    displayAlert("Selecione uma opção válida!", 3000);
  }
  try {
    const result = await contractCanPay.revogarAprovacaoRegistro(registro);
    console.log("aprovação revogada");
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}

async function removerRegistrosExpirados() {
  if(registro == "reset"){
    displayAlert("Selecione uma opção válida!", 3000);
  }
  try {
    const result = await contractCanPay.removerRegistrosExpirados();
    console.log("registros expirados removidos");
    displayAlert("Registro expirados removidos", 3000);
  } catch (error) {
    console.error(error);
    displayAlert(error.message.substring(0, error.message.indexOf("(")), 3000);
  }
}
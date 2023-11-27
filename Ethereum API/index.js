const express = require('express');
const ethers = require('ethers');
const app = express();
require('dotenv').config();
const port = 3000;
const hostname = '192.168.100.26';

// configurando Ethers
let provider = new ethers.InfuraProvider(
  'goerli',
  process.env.IKEY
)
/* let signer = new ethers.Wallet(process.env.KEY, provider);
let contractCanPay = new ethers.Contract(process.env.ENDERECO, process.env.ABI, signer); */
let contractReadOnly = new ethers.Contract(process.env.ENDERECO, process.env.ABI, provider);


app.get('/', (req,res) => {
  res.send('Bem-vindo a API!');
});

app.get('/aprovados', async (req,res) => {
  try {
    const result = await contractReadOnly.obterRegistrosAprovados();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.send('não Registros!!');
  }
  
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}`);
});
const express = require('express');
const app = express();
const port = 3040;

// Adicione este middleware para interpretar o corpo da solicitação como JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem-vindo a API!');
});

app.post('/enviar', async (req, res) => {
    console.log('Dados recebidos do dispositivo IoT');
    console.log(req.body);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

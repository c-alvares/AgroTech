const express = require('express');
const cors = require('cors');

const users = require('./src/routes/usuarios.route');
const drivers = require('./src/routes/motoristas.route');
const fleet = require('./src/routes/frota.route');
const gear = require('./src/routes/manutencao.route');
const operation = require('./src/routes/operacoes.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(users);
app.use(drivers);
app.use(fleet);
app.use(gear);
app.use(operation);

app.listen(3000, () => {
    console.log("Rodando");
})
const express = require('express');
const cors = require('cors');

const users = require('./src/routes/usuarios.route');
const drivers = require('./src/routes/motoristas.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(users);
app.use(drivers);

app.listen(3000, () => {
    console.log("Rodando");
})
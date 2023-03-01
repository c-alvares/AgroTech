const express = require('express');

const router = express.Router();

const User = require('../controllers/usuarios.controller');

const Middle = require('../middleware/middleware');

router.put('*', Middle.acessValidator);
router.delete('*', Middle.acessValidator);

router.post('/acessar', User.login);
router.post('/cadastrarusuario', Middle.acessValidator, User.create);
router.get('/listarusuarios', User.read);
router.get('/buscarusuario/:id', User.readOne);
router.put('/atualizarsenha/:id', User.update);
router.put('/atualizarnivel/:id', User.updateLevel);
router.delete('/excluirusuario/:id', User.remove);

module.exports = router;
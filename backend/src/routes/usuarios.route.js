const express = require('express');

const router = express.Router();

const User = require('../controllers/usuarios.controller');

router.post('/cadastrarusuario', User.create);
router.get('/listarusuarios', User.read);
router.put('atualizarsenha', User.update);

module.exports = router;
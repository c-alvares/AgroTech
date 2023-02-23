const express = require('express');

const router = express.Router();

const User = require('../controllers/usuarios.controller');

router.post('/cadastrarusuario', User.create);
router.get('/listarusuarios', User.read);
router.get('/buscarusuario/:id', User.readOne);
router.put('/atualizarsenha/:id', User.update);
router.put('/atualizarnivel/:id', User.updateLevel);
router.delete('/excluirusuario/:id', User.remove);

module.exports = router;
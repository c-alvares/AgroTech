const express = require('express');

const router = express.Router();

const Maintenance = require('../controllers/manutencao.controller');

router.post('/cadastrarmanutencao', Maintenance.create);
router.get('/listarmanutencoes', Maintenance.read);
router.get('/buscarmanutencao/:id', Maintenance.readOne);
router.put('/atualizartipomanutencao/:id', Maintenance.update);
router.put('/finalizarmanutencao/:id', Maintenance.updateStatus);
router.delete('/excluirmanutencao/:id', Maintenance.remove);

module.exports = router;
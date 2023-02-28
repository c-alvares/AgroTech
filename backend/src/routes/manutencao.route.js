const express = require('express');

const router = express.Router();

const Maintenance = require('../controllers/manutencao.controller');

router.post('/cadastrarmanutencao', Maintenance.create);
router.get('/listarmanutencoes', Maintenance.read);
router.get('/buscarmanutencao/:id', Maintenance.readOne);
router.get('/buscarmanutencoesemcurso/', Maintenance.readOngoing);
router.put('/atualizartipomanutencao/:id', Maintenance.update);
router.put('/finalizarmanutencao/:id/:vehicle_id', Maintenance.updateStatus);
router.delete('/excluirmanutencao/:id/:vehicle_id', Maintenance.remove);

module.exports = router;
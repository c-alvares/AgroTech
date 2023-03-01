const express = require('express');

const router = express.Router();

const Maintenance = require('../controllers/manutencao.controller');

const Middle = require('../middleware/middleware');

router.post('/cadastrarmanutencao', Middle.acessValidator, Maintenance.create);
router.get('/listarmanutencoes', Maintenance.read);
router.get('/buscarmanutencao/:id', Maintenance.readOne);
router.get('/buscarmanutencoesemcurso/', Maintenance.readOngoing);
router.put('/atualizartipomanutencao/:id', Middle.acessValidator, Maintenance.update);
router.put('/finalizarmanutencao/:id/:vehicle_id', Middle.acessValidator, Maintenance.updateStatus);
router.delete('/excluirmanutencao/:id/:vehicle_id', Middle.acessValidator, Maintenance.remove);

module.exports = router;
const express = require('express');

const router = express.Router();

const Operation = require('../controllers/operacoes.controller');

router.post('/criaroperacao', Operation.create);
router.get('/listaroperacoes', Operation.read);
router.get('/buscaroperacao/:id', Operation.readOne);
router.get('/buscaroperacoesemcurso/', Operation.readOngoing);
router.put('/atualizartdescricaoperacao/:id', Operation.update);
router.put('/finalizaroperacao/:id/:driver_id/:vehicle_id', Operation.updateStatus);
router.delete('/excluiroperacao/:id/:vehicle_id', Operation.remove);

module.exports = router;
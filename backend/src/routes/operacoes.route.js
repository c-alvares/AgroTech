const express = require('express');

const router = express.Router();

const Operation = require('../controllers/operacoes.controller');

router.post('/criaroperacao', Operation.create);
router.get('/listaroperacoes', Operation.read);
// router.get('/buscarveiculo/:id', Operation.readOne);
// router.get('/buscarveiculosdisponiveis/', Operation.readByAvailability);
// router.put('/atualizartipo/:id', Operation.update);
// router.put('/alterardisponibilidadeveiculo/:id', Operation.updateStatus);
// router.delete('/excluirveiculo/:id', Operation.remove);

module.exports = router;
const express = require('express');

const router = express.Router();

const Fleet = require('../controllers/frota.controller');

const Middle = require('../middleware/middleware');

router.post('*', Middle.acessValidator);
router.put('*', Middle.acessValidator);
router.delete('*', Middle.acessValidator);

router.post('/cadastrarveiculo', Fleet.create);
router.get('/listarfrota', Fleet.read);
router.get('/buscarveiculo/:id', Fleet.readOne);
router.get('/buscarveiculosdisponiveis/', Fleet.readByAvailability);
router.put('/atualizartipo/:id', Fleet.update);
router.put('/alterardisponibilidadeveiculo/:id', Fleet.updateStatus);
router.delete('/excluirveiculo/:id', Fleet.remove);

module.exports = router;
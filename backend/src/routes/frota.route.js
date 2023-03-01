const express = require('express');

const router = express.Router();

const Fleet = require('../controllers/frota.controller');

const Middle = require('../middleware/middleware');

router.post('/cadastrarveiculo', Middle.acessValidator, Fleet.create);
router.get('/listarfrota', Fleet.read);
router.get('/buscarveiculo/:id', Fleet.readOne);
router.get('/buscarveiculosdisponiveis/', Fleet.readByAvailability);
router.put('/atualizartipo/:id', Fleet.update);
router.put('/alterardisponibilidadeveiculo/:id', Fleet.updateStatus);
router.delete('/excluirveiculo/:id', Middle.acessValidator, Fleet.remove);

module.exports = router;
const express = require('express');

const router = express.Router();

const Fleet = require('../controllers/frota.controller');

router.post('/cadastrarveiculo', Fleet.create);
router.get('/listarfrota', Fleet.read);

module.exports = router;
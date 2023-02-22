const express = require('express');

const router = express.Router();

const Maintenance = require('../controllers/manutencao.controller');

router.post('/cadastrarmanutencao', Maintenance.create);
router.get('/listarmanutencoes', Maintenance.read);

module.exports = router;
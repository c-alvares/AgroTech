const express = require('express');

const router = express.Router();

const Driver = require('../controllers/motoristas.controller');

router.post('/cadastrarmotorista', Driver.create);
router.get('/listarmotoristas', Driver.read);

module.exports = router;
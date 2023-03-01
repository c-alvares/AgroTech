const express = require('express');

const router = express.Router();

const Driver = require('../controllers/motoristas.controller');

const Middle = require('../middleware/middleware');

router.post('/cadastrarmotorista', Middle.acessValidator, Driver.create);
router.get('/listarmotoristas', Driver.read);
router.get('/buscarmotorista/:id', Driver.readOne);
router.get('/buscarmotoristasdisponiveis/', Driver.readByAvailability);
router.put('/atualizardados/:id', Driver.update);
router.put('/alterardisponibilidade/:id', Driver.updateStatus);
router.delete('/excluirmotorista/:id', Middle.acessValidator, Driver.remove);

module.exports = router;
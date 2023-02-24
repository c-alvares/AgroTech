const express = require('express');

const router = express.Router();

const Driver = require('../controllers/motoristas.controller');

router.post('/cadastrarmotorista', Driver.create);
router.get('/listarmotoristas', Driver.read);
router.get('/buscarmotorista/:id', Driver.readOne);
router.get('/buscarmotoristasdisponiveis/', Driver.readByAvailability);
router.put('/atualizardados/:id', Driver.update);
router.put('/alterardisponibilidade/:id', Driver.updateStatus);
router.delete('/excluirmotorista/:id', Driver.remove);

module.exports = router;
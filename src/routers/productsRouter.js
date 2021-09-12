const { Router } = require('express');

const { registerProduct } = require('../controllers/productsController');

const router = Router();

router.post('/', registerProduct);

module.exports = router;

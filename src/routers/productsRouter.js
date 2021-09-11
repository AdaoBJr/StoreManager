const { Router } = require('express');
const productsController = require('../controllers/productsController');

const router = Router();

router.post('/', productsController.registerProduct);

module.exports = router;

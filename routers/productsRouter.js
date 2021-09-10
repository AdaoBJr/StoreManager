const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const { checkName, checkQuantity } = require('../middlewares/productMiddleware');

router.get('/', (req, res) => res.send('products'));

router.post('/', checkName, checkQuantity, productsController.registerProduct);

module.exports = router;

const express = require('express');
const salesController = require('../controllers/salesController');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router.post('/', salesController.createSale);
router.use(errorMiddleware);

module.exports = router;
const express = require('express');

const router = express.Router();

const { create, getAll, update } = require('../controllers/salesController');
const { findId, validQuantity } = require('../middlewares/middlewaresSales');

router.get('/sales', getAll);
router.get('/sales/:id', findId, getAll);
router.post('/sales', create);
router.put('/sales/:id', validQuantity, update);

module.exports = router;

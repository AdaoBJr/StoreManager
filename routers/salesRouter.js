const express = require('express');

const router = express.Router();

const { create, getAll, update, deleteProduct } = require('../controllers/salesController');
const { findId, validQuantity, validId } = require('../middlewares/middlewaresSales');

router.get('/sales', getAll);
router.get('/sales/:id', findId, getAll);
router.post('/sales', create);
router.put('/sales/:id', validQuantity, update);
router.delete('/sales/:id', validId, deleteProduct);

module.exports = router;

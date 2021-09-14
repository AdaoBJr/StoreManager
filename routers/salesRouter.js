const express = require('express');

const router = express.Router();

const { create, getAll } = require('../controllers/salesController');
const { findId } = require('../middlewares/middlewaresSales');

router.get('/sales', getAll);
router.get('/sales/:id', findId, getAll);
router.post('/sales', create);

module.exports = router;

const express = require('express');
const saleController = require('../controllers/saleController');

const route = express.Router();

route.post('/', saleController.save);

module.exports = route;
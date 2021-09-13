const express = require('express');
const { 
  contCreate,
 } = require('../controllers/salesController');

const router = express.Router();

router.post('/', contCreate);

module.exports = router;
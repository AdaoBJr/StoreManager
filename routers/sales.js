const express = require('express');
const { 
  contCreate,
  contListByID,
  contListAll,
 } = require('../controllers/salesController');

const router = express.Router();

router.post('/', contCreate);

router.get('/:id', contListByID);

router.get('/', contListAll);

module.exports = router;
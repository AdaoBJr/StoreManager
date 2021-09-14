const express = require('express');
const { 
  contCreate,
  contListByID,
  contListAll,
  contUpdater,
 } = require('../controllers/salesController');

const router = express.Router();

router.post('/', contCreate);

router.get('/:id', contListByID);

router.get('/', contListAll);

router.put('/:id', contUpdater);

module.exports = router;
const express = require('express');
const { create,
  getAll, update,
  remove, getById } = require('../controllers/productsController');

const router = express.Router();

router.route('/').post(create);

router.route('/:id')
  .get(getById)
  .put(update)
  .delete(remove);

router.route('/').get(getAll);

module.exports = router;

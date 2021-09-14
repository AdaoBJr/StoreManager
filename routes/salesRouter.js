const express = require('express');

const { create,
  getAll,
  getById,
  update, remove } = require('../controllers/salesController');

const router = express.Router();

router.route('/').post(create);

router.route('/:id').get(getById)
  .put(update)
  .delete(remove);

router.route('/').get(getAll);

module.exports = router;

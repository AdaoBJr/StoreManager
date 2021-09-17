const express = require('express');

const router = express.Router();

const { create } = require('./productControllers');

router.route('/')
  .post(create);

module.exports = router;

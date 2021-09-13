const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello products');
});

module.exports = router;
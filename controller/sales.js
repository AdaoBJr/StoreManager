const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  res.send('ok');
});

module.exports = router;
const { Router } = require('express');

const router = Router();

router.get('/teste', (req, res) => {
  res.status(200).json({ message: 'Está Funcionando!' });
});

module.exports = router;

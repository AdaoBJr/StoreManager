const express = require('express');
const {
getAllSales, 
getSaleById, 
createSale, 
updateSale,
deleteSale, 
} = require('../controller/salesController');

const router = express.Router();

router.get('/', getAllSales)
      .get('/:id', getSaleById)
      .post('/', createSale)
      .put('/:id', updateSale)
      .delete('/:id', deleteSale);

module.exports = router;

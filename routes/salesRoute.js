const express = require('express');
const {
  qtyValidator,
  repeatValidator,
  idValidator,
 } = require('../middlewares/salesMw');
const {
  addSales,
  getSales,
  getSaleById,
  updateSale,
  removeSale,
} = require('../controllers/salesCtrl');

const router = express.Router();

router.route('/')
  .post(
    qtyValidator,
    addSales,
  )
  .get(getSales);

router.route('/:id')
    .get(
      idValidator,
      repeatValidator,
      getSaleById,
    )
    .put(
      qtyValidator,
      updateSale,
    )
    .delete(
      idValidator,
      repeatValidator,
      removeSale,
    );

module.exports = router;

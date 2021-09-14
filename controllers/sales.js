const express = require('express');
const rescue = require('express-rescue');
// const { checkProduct } = require('../middleware/checkProduct');
const { isValidId } = require('../middlewareSales/validId');
const { isIdExists } = require('../middlewareSales/checkIdValidation');
const { isValidIdLength } = require('../middlewareSales/checkIdValidation');
const { isIdExistsAfterDelete } = require('../middlewareSales/checkIdValidation');
const { isValidIdLengthDelete } = require('../middlewareSales/checkIdValidation');
const { isValidQuantity } = require('../middlewareSales/validQuantity');
const sales = require('../services/sales');

const router = express.Router();

router.get(
  '/:id',
  isValidIdLength,
  isIdExists,
  rescue(async (req, res) => {
    console.log('controller get ID');
    const { id } = req.params;
    const insertion = await sales.getById(id);
    res.status(200).json(insertion);
  }),
);

router.get(
  '/',
  rescue(async (req, res) => {
    console.log('controller get general');
    const insertion = await sales.getSales();
    res.status(200).json({ sales: insertion });
  }),
);

router.put(
  '/:id',
  isValidQuantity,
  async (req, res) => {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    await sales.updateById(id, productId, quantity);
    res.status(200).json({ _id: id, itensSold: [{ productId, quantity }] });
  },
);

router.delete(
  '/:id',
  isValidIdLengthDelete,
  isIdExistsAfterDelete,
  rescue(async (req, res) => {
    console.log('controllerDelete');
    const { id } = req.params;
    await sales.deleteSaleById(id);
    res.status(200).json('{ id, itensSold: [{ productId, quantity }] }');
  }),
);

router.post(
  '/',
  isValidQuantity,
  isValidId,
  rescue(async (req, res) => {
    const insertion = await sales.create([req.body]);
    const [{ itensSold }] = insertion.ops;
    const { _id } = insertion.ops[0];
    res.status(200).json({ _id, itensSold });
  }),
);

module.exports = router;

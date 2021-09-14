const express = require('express');
const rescue = require('express-rescue');
// const { checkProduct } = require('../middleware/checkProduct');
const { isValidId } = require('../middlewareSales/validId');
const { isValidIdSale } = require('../middlewareSales/validId');
const { isValidQuantity } = require('../middlewareSales/validQuantity');
const sales = require('../services/sales');

const router = express.Router();

router.get(
  '/:id',
  isValidIdSale,
  rescue(async (req, res) => {
    const { id } = req.params;
    const insertion = await sales.getById(id);
    res.status(200).json(insertion);
  }),
);

router.get(
  '/',
  rescue(async (req, res) => {
    const insertion = await sales.getSales();
    res.status(200).json({ sales: insertion });
  }),
);

router.put(
  '/:id',
  isValidQuantity,
  async (req, res) => {
    console.log('controller');
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    await sales.updateById(id, productId, quantity);
    res.status(200).json({ _id: id, itensSold: [{ productId, quantity }] });
  },
);

// router.delete(
//   '/:id',
//   isValidId,
//   async (req, res) => {
//     console.log('controller');
//     const { id } = req.params;
//     const { name, quantity } = req.body;
//     await products.deleteProductById(id);
//     res.status(200).json({ id, name, quantity });
//   },
// );

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

// sconst sales = require('../models/sales');

const isValidId = async (req, res, next) => {
  const [{ productId }] = req.body;

//   req.body.map((prod) => {
//   if (!prod.productId || prod.productId.length < 24 || prod.productId === null) {
//   return res.status(422).json({
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//       },
//     });
//   }
// });
  // const checkId = await sales.getSaleById(productId);
  if (!productId || productId.length < 24 || productId === null) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        },
      });
    }
  next();
};

module.exports = { isValidId };

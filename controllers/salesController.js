const salesService = require('../services/salesService');

const validQuantity = (req, res, next) => {
  console.log(req.body, 'body');
  const { body } = req;
  const verifyTypeQuantity = salesService.verifyTypeQuantity(body);
  const verifyQuantity = salesService.verifyQuantity(body);

  if (verifyTypeQuantity.length !== 0 || verifyQuantity.length !== 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const creteSales = async (req, res) => {
  const { body } = req;
  const created = await salesService.createSales(body);

  // console.log(created, 'controller');
  return res.status(200).json(created);
};

module.exports = {
  validQuantity,
  creteSales,
};
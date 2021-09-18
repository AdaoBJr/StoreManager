const validateQuanty = (quantity) => quantity < 1 || typeof quantity === 'string';

const validateQuantitySales = (req, res, next) => {
  const itensSold = req.body;
  let nextStage = true;

  itensSold.forEach(({ quantity }) => {
    if (validateQuanty(quantity)) {
      nextStage = false;
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  }); 

  if (nextStage) next();
};

module.exports = { validateQuantitySales };

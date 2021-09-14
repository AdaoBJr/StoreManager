const ValidQuantity = async (req, res, next) => {
  const retorno = req.body;

  const quantityValid = retorno.every((result) => result.quantity > 0);

  if (!quantityValid) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }

  next();
};

const ValidQuantityToUpdate = async (req, res, next) => {
  if (!req.params.id || typeof req.body[0].quantity === 'string' || req.body[0].quantity <= 0) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
  next();
};

module.exports = { ValidQuantity, ValidQuantityToUpdate };

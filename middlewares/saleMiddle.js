const error = {
  err: { 
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const saleQuantity = (req, res, next) => {
  const sale = req.body; // array
  if (sale.length === 0) {
    return res.status(422).json(error);
  }
  for (let i = 0; i < sale.length; i += 1) {
    if (sale[i].quantity <= 0 || typeof sale[i].quantity !== 'number') {
      return res.status(422).json(error);
    }
  }
  next();
};

module.exports = { 
  saleQuantity,
};

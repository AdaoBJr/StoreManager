const salesService = require('../services/salesService');

const create = async (req, res) => {
  const salesBody = req.body;
  const result = await salesService.create(salesBody);
  if (result !== null) {
  return res.status(200).json(result);
  }
  return res.status(422).json({
    err: {
      code: 'Invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  });
};

module.exports = {
  create,
};
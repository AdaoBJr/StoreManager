const salesService = require('../services/salesServices');

const CODE_INVALID_DATA = 'invalid_data';

const create = async (req, res) => {
  const itensSold = req.body;

  const sale = await salesService.create({ itensSold });

  if (sale.isJoi) {
    return res.status(422)
      .send({ err: { code: CODE_INVALID_DATA, message: 'Wrong product ID or invalid quantity' },
      });
  }

  return res.status(200).json({ _id: sale.id, itensSold });
};

module.exports = {
  create,
};

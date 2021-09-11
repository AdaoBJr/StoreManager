const salesService = require('../services/salesServices');

const CODE_INVALID_DATA = 'invalid_data';
const CODE_NOT_FOUND = 'not_found';

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

const getAll = async (req, res) => {
  const allSales = await salesService.getAll();
  res.status(200).json({ sales: allSales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const idExiste = await salesService.getById({ id });

  if (idExiste === 'idNaoExiste') {
    return res.status(404).json({ err: { code: CODE_NOT_FOUND, message: 'Sale not found',
    } });
  }

  const result = await salesService.getById({ id });
  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
};

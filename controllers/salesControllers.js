const salesService = require('../services/salesServices');

const CODE_INVALID_DATA = 'invalid_data';
const CODE_NOT_FOUND = 'not_found';
const STOCK_PROBLEM = 'stock_problem';

const create = async (req, res) => {
  const itensSold = req.body;

  const sale = await salesService.create({ itensSold });

  if (sale === 'quantidade insuficiente') {
    return res.status(404)
      .send({ err: { code: STOCK_PROBLEM, message: 'Such amount is not permitted to sell' },
      });
  }

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

  if (idExiste === 'idNaoExiste' || idExiste === null) {
    return res.status(404).json({ err: { code: CODE_NOT_FOUND, message: 'Sale not found',
    } });
  }

  const result = await salesService.getById({ id });
  res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const sales = await salesService.updateById({ id, itensSold });

  if (sales === 'idNaoExiste') {
    return res.status(422).json({ err: { code: CODE_INVALID_DATA, message: 'Wrong id format',
    } });
  }

  if (sales.isJoi) {
    return res.status(422)
      .send({ err: { code: CODE_INVALID_DATA, message: 'Wrong product ID or invalid quantity' },
      });
  }

  const result = await salesService.updateById({ id, itensSold });
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.deleteById({ id });

  if (sales === 'idNaoExiste') {
    return res.status(422).json({ err: { code: CODE_INVALID_DATA, message: 'Wrong sale ID format',
    } });
  }

  const result = await salesService.deleteById({ id });
  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};

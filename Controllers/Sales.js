const {
  getSalesList,
  saleById,
  delSaleById,
  createNewSales,
  updateSale,
} = require('../Services/Sales');

const requestNewSales = async (req, res) => {
  const { body } = req;

  const products = body;

  const newSalesRequested = await createNewSales(products);

  return res.status(200).json(newSalesRequested);
};

const requestSalesList = async (_req, res) => {
  const sales = await getSalesList();

  console.log(sales);

  return res.status(200).json({ sales });
};

const requestSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleById(id);

  if (!sale) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  return res.status(200).json(sale);
};

const requestDeleteSaleById = async (req, res) => {
  const { id } = req.params;

  const deletedSale = await delSaleById(id);

  if (deletedSale) {
    return res.status(200).json(deletedSale);
  }

  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  });
};

const requestUpdateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedSale = await updateSale(id, body);

  if (!updatedSale) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};

module.exports = {
  requestSalesList,
  requestSaleById,
  requestDeleteSaleById,
  requestNewSales,
  requestUpdateSale,
};

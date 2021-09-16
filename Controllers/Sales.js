const { getSalesList, saleById, delSaleById } = require('../Services/Sales');

const requestNewSales = async (req, res) => {
  // const { body } = req;

  // const products = body;

  // const productVerify = await verifyProducts(products);

  // if (!productVerify) {
  //   return res.status(422).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong product ID or quantity',
  //     },
  //   });
  // }

  return res.status(200).json({ message: 'cheguei' });
};

const requestSalesList = async (req, res) => {
  const salesList = await getSalesList();

  return res.status(200).json({ salesList });
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

module.exports = {
  requestSalesList,
  requestSaleById,
  requestDeleteSaleById,
  requestNewSales,
};

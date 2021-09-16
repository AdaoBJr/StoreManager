const { getSalesList, saleById } = require('../Services/Sales');

// const requestNewSales = async (req, res) => {
//   const { name, quantity } = req.body;

//   const verifiedSale = await verifySales(name, quantity);

//   if (!newSale) {
//     return res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: 'Wrong product ID or quantity',
//       },
//     });
//   }

//   return res.status(200).json(newSale);
// };

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

module.exports = {
  requestSalesList,
  requestSaleById,
};

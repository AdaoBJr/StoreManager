const salesService = require('../services/salesService');

const STATUS_OK = 200;

const registerSales = async (req, res) => {
  const itemSold = req.body;
  const newSales = await salesService.registerSales(itemSold);

  if (newSales.err) {
    return res.status(422).json(newSales);
  }

  return res.status(STATUS_OK).json(newSales);
};

const getAllSales = async (req, res) => {
  const listAllSales = await salesService.getAllSales();

  return res.status(STATUS_OK).json(listAllSales);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const salesId = await salesService.getSalesId(id);

  if (salesId.err) {
    return res.status(404).json(salesId);
  }

  return res.status(STATUS_OK).json(salesId);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const dataSales = req.body;
  console.log(dataSales);
  const updatedSale = await salesService.updateSale(id, dataSales);

  if (updatedSale.err) {
    return res.status(422).json(updatedSale);
  }

  const itensSold = [
    {
      productId: dataSales[0].productId,
      quantity: dataSales[0].quantity,
    },
  ];

  return res.status(STATUS_OK).json({ _id: id, itensSold });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  // const { productId, quantity } = req.body;
  const saleId = await salesService.deleteSale(id);
  if (saleId.err) {
    return res.status(422).json(saleId);
  }

  /* const itensSold = [
    {
      productId,
      quantity,
    },
  ]; */

  return res.status(STATUS_OK).json(saleId);
};

module.exports = {
  registerSales,
  getAllSales,
  getSalesId,
  updateSale,
  deleteSale,
};

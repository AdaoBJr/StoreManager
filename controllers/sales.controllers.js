const {
  createSale,
  getAllSales,
  getSaleById,
  updateSales,
  removeSale,
} = require('../services/sales.service');

const createNewSale = async (req, res) => {
  const sale = req.body;
  const newSale = await createSale(sale);
  if (newSale.err) {
    return res.status(404).json({ err: newSale.err });
  }
  
  return res.status(200).json(newSale);
};

const listAllSales = async (_req, res) => {
  const sales = await getAllSales();
  return res.status(200).json({ sales });
};

const saleById = async (req, res) => {
  const { id } = req.params;
  const sales = await getSaleById(id);
  if (!sales) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }  

  return res.status(200).json({ sales });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itemsToUpdate = req.body;
  const updatedSale = await updateSales(id, itemsToUpdate);
  if (updatedSale.err) {
    return res.status(422).json(...updatedSale.err);
  }
  return res.status(200).json({ _id: id, itensSold: updatedSale });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await removeSale(id);
  if (deletedSale.deletedCount === 0) {
    return res.status(404).json({ err: {
      code: 'not_found',
      message: 'Sale not found',
    } });
  }
  return res.status(200).json(deletedSale.sale);
};
module.exports = {
  createNewSale,
  listAllSales,
  saleById,
  updateSale,
  deleteSale,
};
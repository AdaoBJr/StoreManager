const {
  addSale,
  getSales,
  getSaleWithId,
  updateSaleWithId,
  deleteSaleWithId,
} = require('../services/salesService');

const newSale = async (req, res, next) => {
  try {
    const sale = await addSale(req.body);
    
    return res.status(200).json({ ...sale });
  } catch (err) {
    return next(err);
  }
};

const allSales = async (_req, res, next) => {
  try {
    const sales = await getSales();
    
    return res.status(200).json({ sales });
  } catch (err) {
    return next(err);
  }
};

const saleWithId = async (req, res, next) => {
  try {
    const sale = await getSaleWithId(req.params);
    
    return res.status(200).json({ ...sale });
  } catch (err) {
    return next(err);
  }
};

const updateWithId = async (req, res, next) => {
  try {
    const product = await updateSaleWithId(req.params, req.body);
    
    return res.status(200).json({ ...product });
  } catch (err) {
    return next(err);
  }
};

const deleteWithId = async (req, res, next) => {
  try {
    await deleteSaleWithId(req.params);
    
    return res.status(200).json({ _id: req.params.id });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newSale,
  allSales,
  saleWithId,
  updateWithId,
  deleteWithId,
};

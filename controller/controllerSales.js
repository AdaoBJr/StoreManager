// const Joi = require('joi');
// const { quantitySalesValid } = require('../schemas/schemasValidate');
const ServiceSales = require('../service/serviceSales');

// const errData = {
//   err: {
//     code: 'invalid_data',
//     message: 'Wrong product ID or invalid quantity',
//   },
// };

const errStock = { 
  err: { 
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const saleDeleted = await ServiceSales.getById(id);
  const deleteOne = await ServiceSales.deleteSale(id);

  if (deleteOne.err) return res.status(422).json(deleteOne);
  return res.status(200).json(saleDeleted);
};

const update = async (req, res) => {
  const { id } = req.params;
  const saleUpdate = req.body;

  // const onlyQuantity = itensSold.map((sale) => sale.quantity || false);
  // const schema = Joi.array().items(Joi.number().strict().min(0).required()).validate(onlyQuantity);
    
  // if (schema.error) return res.status(422).json(errData);

  const saleUpdated = await ServiceSales.update(id, saleUpdate);
  if (!saleUpdated || saleUpdated.err) {
    return res.status(422).json({ 
        err: { 
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
    }); 
  } 
  return res.status(200).json(saleUpdated);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await ServiceSales.getById(id);

  if (sale.err) return res.status(404).json(sale);
  return res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await ServiceSales.getAll();
  return res.status(200).json(sales);
};

const create = async (req, res) => {
  const itensSold = req.body;
  
  // const onlyQuantity = itensSold.map((sale) => sale.quantity || false);
  // const schema = Joi.array().items(Joi.number().strict().min(0).required()).validate(onlyQuantity);
    
  // if (schema.error) return res.status(422).json(errData);

  const salesMade = await ServiceSales.create(itensSold);
  if (salesMade.outStock) return res.status(404).json(errStock);

  return res.status(200).json(salesMade);
};

module.exports = { create, getAll, getById, update, deleteSale };

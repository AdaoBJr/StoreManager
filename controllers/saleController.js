const Joi = require('@hapi/joi');
const saleService = require('../service/salesService');

const create = async (req, res) => {
    const { error } = Joi.array().items({
        productId: Joi.not().empty().required(),
        quantity: Joi.number().integer().not().empty()
.min(1)
        .required(),
      })
        .validate(req.body);
      if (error) {
 return res.status(422).json({
        err: { 
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity' } }); 
}
    
    const sale = await saleService
    .create(req.body);
    if (sale.err) return res.status(422).json(sale);
    
    return res.status(200).json(sale);
};

const getAll = async (req, res) => {
  const sale = await saleService
  .getAll();
  if (sale.err) return res.status(422).json(sale);
  return res.status(200).json({ sales: sale });
};

const findById = async (req, res) => {
  const { id } = req.params;
  
  const sale = await saleService.findById(id);
  if (sale.err) {
 return res.status(404).json({
    err: { 
      code: 'not_found',
      message: 'Sale not found' },
  }); 
}
  res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { error } = Joi.array().items({
    productId: Joi.not().empty().required(),
    quantity: Joi.number().integer().not().empty()
.min(1)
    .required(),
  })
    .validate(req.body);
  if (error) {
return res.status(422).json({
    err: { 
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity' } }); 
}
const sale = await saleService.updateSale(id, req.body);
if (!sale) return res.status(422).json(sale);

return res.status(200).json(sale); 
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService
  .removeSale(id);
  if (sale.err) {
 return res.status(422).json({
    err: { 
      code: 'invalid_data',
      message: 'Wrong sale ID format' },
  }); 
}
  return res.status(200).json(sale);
};

module.exports = {
    create,
    getAll,
    findById,
    updateSale,
    removeSale,
};
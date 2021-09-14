const { ObjectId } = require('mongodb');
const salesModels = require('../models/salesModels');
const { 
  isValidQuantitySales, isValidIdForReqSix } = require('../middlewares/validations');

const createSale = async (body) => {
  const validQuantity = body.map((obj) => {
    const isValidQuatity = isValidQuantitySales(obj.quantity);
    if (isValidQuatity.err) return isValidQuatity;
    return isValidQuatity;
  });
  
  if (validQuantity[0].err) return validQuantity[0];
  const returnModel = await salesModels.createSale(body);
  return returnModel;
};

const getAll = async () => salesModels.getAll(); 

const getSalesById = async (id) => {
  const isValid = isValidIdForReqSix(id);
  // console.log(isValid);
  if (isValid.err) return isValid;
  const resultModel = await salesModels.getSalesById(id);
  if (!resultModel) return { err: { code: 'not_found', message: 'Sale not found' } };
  return resultModel;
};

const update = async ({ id, arrayBody }) => {
  const validQuantity = isValidQuantitySales(arrayBody.quantity);
  if (validQuantity.err) return validQuantity;
  const resultModel = await salesModels.update({ id, arrayBody });
  return resultModel;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } }; 
}
  const { _id } = await getSalesById(id);
  if (_id) return { err: { code: 'not_found', message: 'Sale not found' } };
  await salesModels.exclude(id);
  return { _id };
};

module.exports = {
  createSale,
  getAll,
  getSalesById,
  update,
  exclude,
};
const { salesValidator } = require('../middleware/sales');
const {
  modelCreate, modelListAll, modelListById,
} = require('../models/salesModel');

const servCreate = async (itens) => {
  const invalidator = await salesValidator(itens);
  if (invalidator) {
    return invalidator;
  }
  const a = await modelCreate(itens);
  return a;
};

const servListByID = async (id) => { 
  const result = await modelListById(id);
  if (!result) return { err: { code: 'not_found', message: 'Sale not found' }, code: 404 };
 return result;
};

const servListAll = async () => modelListAll();

module.exports = {
  servCreate,
  servListByID,
  servListAll,
};
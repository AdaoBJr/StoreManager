const { salesValidator } = require('../middleware/sales');
const {
  modelCreate, modelListAll, modelListById, modelUpdater, modelEraser,
} = require('../models/salesModel');

const servCreate = async (itens) => {
  const invalidator = await salesValidator(itens);
  if (invalidator) {
    return invalidator;
  }
  const a = await modelCreate(itens);
  return a;
};

const servEraser = async (id) => {
  const result = await modelEraser(id);
  if (!result) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' }, code: 422 };
  // if (!result) return { err: { code: 'not_found', message: 'Sale not found' }, code: 404 }
  return result;
};

const servUpdater = async ({ id, itensSold }) => {
  const invalidator = await salesValidator(itensSold);
  if (invalidator) {
    return invalidator;
  }
  return modelUpdater({ id, itensSold });
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
  servUpdater,
  servEraser,
};
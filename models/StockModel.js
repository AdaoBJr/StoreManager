const { ObjectId } = require('mongodb');

const connection = require('./connection');
const ProductsModel = require('./ProductsModel');

const COLLECTION = 'products';
const ERRORS = {
  stockProblem: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

async function update(productId, quantity) {
  if (quantity >= 0) {
    await connection()
      .then((db) => db.collection(COLLECTION).updateOne(
        { _id: ObjectId(productId) },
        { $set: { quantity } },
        { returnOriginal: false },
    ));
  }

  return { error: true };
}

async function bulkUpdate(data, targetCase) {
  let result;

  data.forEach(async ({ productId, quantity }) => {
    const { product } = await ProductsModel.getById(productId);

    if (targetCase === 'isCreation') {
      const { error } = await update(productId, (product.quantity - quantity));

      result = { error };

      return '';
    }

    if (targetCase === 'isUpdate') {
      const { error } = await update(productId, (product.initialStock - quantity));

      result = { error };
      
      return '';
    }

    return update(productId, (product.quantity + quantity));
  });
  
  return result;
}

async function createStock(data) {
  const result = await bulkUpdate(data, 'isCreation');

  return result;
}

async function updateStock(data) {
  const result = await bulkUpdate(data, 'isUpdate');

  return result;
}

async function restoreStock(data) {
  const bulkData = data.itensSold;

  await bulkUpdate(bulkData, 'isDelete');
}

module.exports = { createStock, updateStock, restoreStock };
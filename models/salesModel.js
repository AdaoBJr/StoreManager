const mongoConnection = require('./connection');
const productModel = require('./productsModel');

const create = async ({ productId, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const productID = await productModel.getById(productId);
  const { insertedId: id } = await productsCollection.insertOne(
    { itensSold: [{ productId: productID, quantity }] },
);
  console.log(id, 'model');
  return { id, productId, quantity };
};
  
module.exports = {
  create,
};

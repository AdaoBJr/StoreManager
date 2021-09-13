const mongoConnection = require('./connection');
const productModel = require('./productsModel');

const create = async ({ productId, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('sales'));

  const productID = await productModel.getById(productId);
  const { insertedId: id } = await productsCollection.insertMany([
    { productId: productID, quantity }]);

  // console.log(productID, 'controller');
  return { _id: id, productId, quantity };
};
  
module.exports = {
  create,
};

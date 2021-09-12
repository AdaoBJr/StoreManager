const mongoConnection = require('./connection');

const create = async ({ productId, quantity }) => {
    const productsCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('sales'));
  
    const createdProduct = await productsCollection.insertOne({ productId, quantity });
    return {
      id: createdProduct.insertedId,
      productId,
      quantity,
    };
  };
  
module.exports = {
    create,
};

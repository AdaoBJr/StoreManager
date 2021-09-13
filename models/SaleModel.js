// const { ObjectId } = require('mongodb');
const Connection = require('./connection');
// const ProductModel = require('./ProductModel');

const createSale = async ({ productId, quantity }) => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));

    // const productID = await ProductModel.findProductById(productId);
        
    const { insertedId: id } = await salesCollection.insertOne({
      productId,
      quantity,
    });
    // console.log(productId, 'ProductId');
    // console.log(quantity, 'Quantidade');
            
    return {
      id,
      productId,
      quantity,
    };
  };
  
module.exports = {
  createSale,
};

// const connection = require('./connection');
const mongoConnection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const db = await mongoConnection.connection();
  const consultExistProduct = await db.collection('products').findOne({ name });
  
  if (typeof consultExistProduct !== 'object') { 
    return { 
      err: { code: 'invalid_data', message: 'Product already exists' } }; 
    }
    
    const resultCreate = await db.collection('products').insertOne({ name, quantity });
    // console.log(resultCreate);

  return { 
    id: resultCreate.insertedId,
    name,
    quantity };
};

// const getAll = async () => {
//   const db = await mongoConnection.connection();
//   const resultQuery = await db.collection('products').findMany().toArray();
 
//   return resultQuery;
// };

module.exports = {
  createProduct,
  // getAll,
};
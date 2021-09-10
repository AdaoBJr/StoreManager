const Connection = require('./connection');

// const getAll = async () => Connection.getConnection().then((db) => {
//  db.collection('products').find().toArray();
//   });

const create = async ({ name, quantity }) => {
  const productsCollection = await Connection.getConnection()
    .then((db) => db.collection('products'));
    
    const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });
    
    return {
      id,
      name,
      quantity,
    };
  };

const findByName = async (name) => {
  const productsCollection = await Connection.getConnection()
  .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });
  
  return product;
};
  
module.exports = {
  create,
  // getAll,
  findByName,
}; 
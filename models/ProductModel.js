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

  // const findById = async (name) => Connection.getConnection().then(db.collection('products').findOne({ name }));
  
module.exports = {
  create,
  // getAll,
  // findById,
}; 
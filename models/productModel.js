const mongoConnection = require('./connection');

const getNewproduct = (authorData) => {
    const { _id, name, quantity } = authorData;
    
    return {
      _id,
      name,
      quantity,
    };
    };

const findByName = async (name) => {
    const db = await mongoConnection();

      const response = await db.collection('products').findOne({ name });

       if (!response) return null;

       const { quantity, id } = response;

       return getNewproduct({ quantity, id, name });
};

const create = async (name, quantity) => mongoConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => getNewproduct({ _id: result.insertedId, name, quantity }));

module.exports = {
  create,
  findByName,
};
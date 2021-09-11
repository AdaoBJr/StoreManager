const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewproduct = async (authorData) => {
    const { _id, name, quantity } = authorData;

    return {
        _id,
        name, 
        quantity,
    };
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await mongoConnection();
    const response = await db.collection('products').findOne(ObjectId(id));
        const { quantity, name } = response;
        return getNewproduct({ quantity, id, name });
};

const findByName = async (name) => {
    const db = await mongoConnection();
      const response = await db.collection('products').findOne({ name });
       if (!response) return null;
       const { quantity, id } = response;
       return getNewproduct({ quantity, id, name });
};

const getAll = async () => {
    const db = await mongoConnection();
    const response = await db.collection('products').find().toArray();
    if (!response) return null;
    return response;
};

const create = async (name, quantity) => mongoConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => getNewproduct({ _id: result.insertedId, name, quantity }));

module.exports = {
  create,
  findByName,
  getAll,
  findById,
};
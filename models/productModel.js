const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewproduct = async (id, name, quantity) => {
    console.log(id, name, quantity);
    return {
        _id: id,
        name, 
        quantity,
    };
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await mongoConnection();
    const response = await db.collection('products').findOne(ObjectId(id));
        const { quantity, name } = response;

        return getNewproduct(id, name, quantity);
};

const findByName = async (name) => {
    const db = await mongoConnection();
      const response = await db.collection('products').findOne({ name });
       if (!response) return null;
       const { quantity, id } = response;   
       return getNewproduct(id, name, quantity);
};

const getAll = async () => {
    const db = await mongoConnection();
    const response = await db.collection('products').find().toArray();
    if (!response) return null;
    return response; 
};

const create = async (name, quantity) => mongoConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => getNewproduct(result.insertedId, name, quantity));

const updateProduct = async (id, name, quantity) => {
    const db = await mongoConnection();
    await db.collection('products').updateOne({
        _id: ObjectId(id), 
    }, {
        $set: {
        name, 
        quantity,
        },
    });

   return getNewproduct(id, name, quantity);
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  updateProduct,
};
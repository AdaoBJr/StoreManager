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

        const data = getNewproduct({ quantity, id, name });
        console.log(data);
        return data;
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

const updateProduct = async (id, name, quantity) => {
    const db = await mongoConnection();
    const response = await db.collection('products').updateOne({
        _id: id, 
    }, {
        $set: {
        name, 
        quantity,
        },
    });

    // console.log(response, name, quantity, id, 'resposta');
    return response;
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  updateProduct,
};
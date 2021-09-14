const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewSale = async (idSale, obj) => {
    console.log(obj, 'aqio');
     return {
         _id: idSale, 
         itensSold: 
             obj,

    };
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await mongoConnection();
    const response = await db.collection('sales').findOne(ObjectId(id));
        // const { quantity, name } = response;

        return response;
};
const getAll = async () => {
    const db = await mongoConnection();
    const response = await db.collection('sales').find().toArray();
    return response; 
};

const create = async (itensSold) => mongoConnection()
.then((db) => db.collection('sales').insertOne({ itensSold }))
.then((result) => getNewSale(result.insertedId, itensSold));

module.exports = { 
    create,
    getAll,
    findById,
};
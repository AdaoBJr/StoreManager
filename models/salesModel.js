const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getNewSale = async (idSale, obj) => 
      ({
         _id: idSale, 
         itensSold: obj,
    });
const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await mongoConnection();
    const response = await db.collection('sales').findOne(ObjectId(id));

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

const updateSale = async (id, itensSold) => {
    const { productId, quantity } = itensSold[0];
    console.log(productId, quantity, itensSold);
    const db = await mongoConnection();
    await db.collection('sales').updateOne({
        _id: ObjectId(id), 
    }, {
        $set: {
        'itensSold.0.productId': productId, 
        'itensSold.0.quantity': quantity,
        // productId, 
        // quantity,
        },
    });

   return getNewSale(id, itensSold);
};

const removeSale = async (id) => {
    const existingSale = await findById(id);
    const db = await mongoConnection();
     await db.collection('sales').deleteOne({ _id: ObjectId(id) });
    return existingSale;
};

module.exports = { 
    create,
    getAll,
    findById,
    updateSale,
    removeSale,
};
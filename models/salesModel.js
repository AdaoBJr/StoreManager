const mongoConnection = require('./connection');

const getNewSale = async (idSale, obj) => {
    console.log(obj, 'aqio');
     return {
         _id: idSale, 
         itensSold: 
             obj,

    };
};

// const findByName = async (id) => {
//     const db = await mongoConnection();
//       const response = await db.collection('products').findOne({ name });
//        if (!response) return null;
//        const { quantity, id } = response;   
//        return getNewproduct(id, name, quantity);
// };

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
};
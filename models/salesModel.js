const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const get = await db.collection('sales').find().toArray();

    return get;
};

const getById = async (id) => {
    // console.log(id);
    const db = await connection();
    const get = await db.collection('sales').findOne({ _id: ObjectId(id) });
    // console.log('model return produto getbyId');
    //  console.log(get);
    return get;
};

const saleExists = async (id) => {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: id });

    return sale !== null;
};

const create = async (sales) => {
    const db = await connection();
    const nS = await db.collection('sales').insertOne({ itensSold: sales });
//    console.log(nS);
    return nS.insertedId;
};
    // const update = async ({ id, name, quantity }) => {
    //     const testeID = ObjectId.isValid(id);
    //     // console.log(testeID);
    //     if (!testeID) {
    //         return null;
    //     }
    //     const db = await connection();
    //     const product = await db.collection('products').updateOne(
    //         { _id: ObjectId(id) }, { $set: { name, quantity } },
    //     );
    //     return product;
    // };

    // const deleteProduct = async (id) => {

    //     if (!ObjectId.isValid(id)) {
    //         return null;
    //     }

    //     const db = await connection();
    //     const deleteP = await db.collection('products').deleteOne({ _id: ObjectId(id) });
    //     if (deleteP.deletedCount === 1) return true;

    //     return false;
    // };

module.exports = { getAll, create, getById, saleExists };
const connection = require('./connections');

const addSale = async (products) => {
    const db = await connection();
    const sale = await db.collection('sales').insertOne({ itensSold: products,
     });

    return sale.ops[0];
};

module.exports = {
    addSale,
};
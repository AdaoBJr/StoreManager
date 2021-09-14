const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const findSaleById = async (id) => {
  const db = await connection();
  const saleFound = await db.collection('sales').findOne(new ObjectId(id));

  return saleFound;
};

const saleExists = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const wasFound = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return wasFound;
};

const createSale = async (sale) => {
  const db = await connection();
  const insert = await db.collection('sales').insertOne(
    {
      itensSold: sale,
    },
  );
  const createdProduct = insert.ops[0];
  return createdProduct;
};

const updateSale = async (id, sale) => {
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: sale } },
  );
  return findSaleById(id);
};

const deleteSale = async (id) => {
  const db = await connection();
  const { value } = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });

  return { value };
};

module.exports = {
  getAllSales,
  findSaleById,
  createSale,
  saleExists,
  updateSale,
  deleteSale,
};

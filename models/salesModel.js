const { ObjectId } = require('mongodb');
const { getAllProd } = require('./productsModel');
const connection = require('./connection');

const updateQuantity = async ({ productId, quantity, sale }) => {
  const db = await connection();
  const updateProduct = await db.collection('products').findOne({ _id: ObjectId(productId) });
  if (sale) {
    updateProduct.quantity -= quantity;
  } else {
    updateProduct.quantity += quantity;
  }
  await db.collection('products').updateOne(
    { _id: ObjectId(productId) },
    { $set: updateProduct },
  );
  return sale;
};
const saleAdd = async (result) => {
  const db = await connection();
  const allProducts = await getAllProd();
  const products = result.filter((product) => allProducts
    .some((item) => (item.quantity - product.quantity) <= 0)).length;
  if (products === 0) {
    const sale = await db.collection('sales').insertOne({ itensSold: result });
    const { insertedId } = sale;
    const insert = JSON.parse(sale);
    const saleOk = insert.ops[0].itensSold;
    result.forEach((item) => {
      const { productId, quantity } = item;
      updateQuantity({ productId, quantity, sale: true });
    });
    return { _id: insertedId, itensSold: saleOk };
  }
  return {
    err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
  };
};
const getAllsales = async () => {
  const db = await connection();
  const sale = await db.collection('sales').find().toArray();
  return sale;
};
const getSalesId = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const sale = await db.collection('sales').findOne(ObjectId(id));
  if (sale) {
    return { status: 200, sale };
  }
  return { status: 404, err: { code: 'not_found', message: 'Sale not found' } };
};
const deleteSale = async ({ id }) => {
  const db = await connection();
  const { sale: { itensSold: saleSold } } = await getSalesId(id);
  const sale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  saleSold.forEach((item) => {
    const { productId, quantity } = item;
    updateQuantity({ productId, quantity, sale: false });
  });
  return sale;
};
const updateSale = async ({ id, productId, quantity }) => {
  const db = await connection();
  const insert = await getSalesId(id);
  if (insert.err) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  const { sale: { itensSold } } = insert;
  itensSold.forEach((item, index) => {
    if (item.productId === productId) {
      itensSold[index].quantity = quantity;
    }
  });
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } });
  return { _id: ObjectId(id), itensSold };
};

module.exports = {
  saleAdd,
  getAllsales,
  getSalesId,
  updateSale,
  deleteSale,
};

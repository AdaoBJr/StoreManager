const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { allProducts } = require('./productModel');

const update = async ({ productId, quantity, sold }) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(productId) });
  if (sold) {
    product.quantity -= quantity;
  } else {
    product.quantity += quantity;
  }

  await db.collection('products').updateOne({ _id: ObjectId(productId) },
  { $set: product });
};

const newSale = async (res) => {
  const db = await connection();
  const products = await allProducts();

  const sell = res.filter((product) => products
    .some((item) => (item.quantity - product.quantity) <= 0)).length;

  if (sell === 0) {
    const sold = await db.collection('sales').insertOne({ itensSold: res });
    const { insertedId } = sold;
    const descSale = JSON.parse(sold);
    const completed = descSale.ops[0].itensSold;

    res.forEach((item) => {
      const { productId, quantity } = item;
      update({ productId, quantity, sold: true });
    });

    return { _id: insertedId, itensSold: completed };
  }
  return {
    err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
  };
};

const allSolds = async () => {
  const db = await connection();
  const sold = await db.collection('sales').find().toArray();
  return sold;
};

const soldId = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const sold = await db.collection('sales').findOne(ObjectId(id));
  if (sold) {
    return { status: 200, sold };
  }
  return { status: 404, err: { code: 'not_found', message: 'Sale not found' } };
};

const updateSold = async ({ id, productId, quantity }) => {
  const db = await connection();

  const sell = await soldId(id);
  if (sell.err) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  const { venda: { itensSold } } = sell;

  itensSold.forEach((item, index) => {
    if (item.productId === productId) {
      itensSold[index].quantity = quantity;
    }
  });
  await db.collection('sales').updateOne({ _id: ObjectId(id) },
  { $set: { itensSold } });

return { _id: ObjectId(id), itensSold };
};

module.exports = { newSale, allSolds, soldId, updateSold };

const { ObjectId } = require('mongodb');
const { listProducts } = require('./productModel');
const connection = require('./mongoConnection');

const updateQuantity = async ({ productId, quantity, venda }) => {
  const db = await connection();
  const productExists = await db.collection('products').findOne({ _id: ObjectId(productId) });
  if (venda) {
    productExists.quantity -= quantity;
  } else {
    productExists.quantity += quantity;
  }

  await db.collection('products').updateOne({ _id: ObjectId(productId) },
  { $set: productExists });
};

const newSales = async (result) => {
  const db = await connection();
  const allProducts = await listProducts();

  const permitido = result.filter((produto) => allProducts
    .some((item) => (item.quantity - produto.quantity) <= 0)).length;

    if (permitido === 0) {
      const venda = await db.collection('sales').insertOne({ itensSold: result });
      const { insertedId } = venda;
      const xablau = JSON.parse(venda);
      const vendaConcluida = xablau.ops[0].itensSold;

      result.forEach((item) => {
        const { productId, quantity } = item;
        updateQuantity({ productId, quantity, venda: true });
      });

      return { _id: insertedId, itensSold: vendaConcluida };
    }
    return {
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } };
};

const listSales = async () => {
  const db = await connection();
  const venda = await db.collection('sales').find().toArray();
  return venda;
};

const listById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;

  const venda = await db.collection('sales').findOne(ObjectId(id));
  if (venda) {
    return { status: 200, venda };
  }
  return { status: 404, err: { code: 'not_found', message: 'Sale not found' } };
};

const deleteSale = async ({ id }) => {
  const db = await connection();
  const { venda: { itensSold: vendaLocalizada } } = await listById(id);
  const venda = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  vendaLocalizada.forEach((item) => {
    const { productId, quantity } = item;
    updateQuantity({ productId, quantity, venda: false });
  });

  return venda;
};

const updateSale = async ({ id, productId, quantity }) => {
  const db = await connection();

  const idProducts = await listById(id);
  if (idProducts.err) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  const { venda: { itensSold } } = idProducts;

  itensSold.forEach((item, index) => {
    if (item.productId === productId) {
      itensSold[index].quantity = quantity;
    }
  });

  await db.collection('sales').updateOne({ _id: ObjectId(id) },
    { $set: { itensSold } });

  return { _id: ObjectId(id), itensSold };
};

module.exports = { newSales, listSales, listById, updateSale, deleteSale };

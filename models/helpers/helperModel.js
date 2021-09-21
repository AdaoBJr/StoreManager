const { findById, update } = require('../products');

const productsExpand = ({ itensSold }) => {
  itensSold.forEach(async ({ productId: id, quantity }) => {
    const { product } = await findById({ id });
    await update({ id, name: product.name, quantity: product.quantity - quantity });
  });
};

const restoreProducts = ({ sale: { itensSold } }) => {
  itensSold.forEach(async ({ productId: id, quantity }) => {
    const { product } = await findById({ id });
    await update({ id, name: product.name, quantity: product.quantity + quantity });
  });
};

module.exports = {
    productsExpand,
    restoreProducts,
};
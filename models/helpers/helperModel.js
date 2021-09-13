const { findById, update } = require('../productsModel');

const expendQuantProducts = async ({ itensSold }) => {
  itensSold.forEach(async ({ productId: id, quantity }) => {
    const { product } = await findById({ id });
    await update({ id, name: product.name, quantity: product.quantity - quantity });
  });
};

const restoreQuantProducts = async ({ sale: { itensSold } }) => {
  itensSold.forEach(async ({ productId: id, quantity }) => {
    const { product } = await findById({ id });
    await update({ id, name: product.name, quantity: product.quantity + quantity });
  });
};

module.exports = {
  expendQuantProducts,
  restoreQuantProducts,
};
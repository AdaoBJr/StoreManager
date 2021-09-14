const saleModel = require('../models/saleModel');
// const productModel = require('../models/productModel');

const createSale = async (itensSold) => {
  // console.log(itensSold);

  // const itensSoldIDs = itensSold.filter((id) => id.productId);
  // console.log(itensSoldIDs);

  // const productExists = await productModel.productIdExists(itensSold.productId);
  // console.log(productExists);

  // if (!productExists || itensSold.quantity <= 0 || typeof itensSold.quantity !== 'number') {
  //   return { erro: 'Wrong product ID or invalid quantity' };
  // }

  // ajuda de Fernanda Porto
  const itens = itensSold
  .find((obj) => obj.productId.length < 5 || obj.quantity <= 0 || typeof obj.quantity !== 'number');
  if (itens) return { erro: 'Wrong product ID or invalid quantity' };

  return saleModel.create(itensSold);
};

const updateSale = async ({ id, name, quantity }) => {
    if (name.length < 5) {
        return { erro: '"name" length must be at least 5 characters long' }; 
    }

    if (quantity <= 0) return { erro: '"quantity" must be larger than or equal to 1' };
    if (typeof quantity !== 'number') return { erro: '"quantity" must be a number' };

    return saleModel.update({ id, name, quantity });
};

const excludeSale = async (id) => {
    const sale = await saleModel.saleIdExists(id);
    if (!sale) return null;

    const { name, quantity, _id } = sale;
    await saleModel.exclude(id);
    return { name, quantity, _id };
};

module.exports = { createSale, updateSale, excludeSale };
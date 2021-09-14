const saleModel = require('../models/salesModel');

const create = async (obj) => 
    // const existingProduct = await productModel.findByName(name);
  
    // if (existingProduct) {
    //   return {
    //     err: {
    //       code: 'invalid_data',
    //       message: 'Product already exists',
    //     },
    //   };
    // }
  
     saleModel.create(obj);

const getAll = async () => saleModel.getAll();

const findById = async (id) => {
    const sale = await saleModel.findById(id);
  
    if (!sale) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      };
    }
    return sale;
};

const updateSale = async (id, obj) => {
    const existingProduct = await findById(id);
    if (existingProduct.err) return existingProduct;

     return saleModel.updateSale(id, obj);
  };

  const removeSale = async (id) => {
        const existingProduct = await findById(id);
        if (existingProduct.err) return existingProduct;
         return saleModel.removeSale(id);
  };
  module.exports = {
      create,
      getAll,
      findById,
      updateSale,
      removeSale,
  };
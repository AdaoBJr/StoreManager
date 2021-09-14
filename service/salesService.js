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
module.exports = {
      create,
      getAll,
  };
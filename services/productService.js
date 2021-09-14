const { getAll, add, getById, update, exclude, productExists } = require('../models/productModel');

const createProduct = async({name, quantity} )=> {
  const product = await productExists(name);


    if(product)
      return null;

  return await add({name, quantity})

}

const updateProduct = async({ id, name, quantity })=> {

}

module.exports ={
  createProduct,
  updateProduct
}
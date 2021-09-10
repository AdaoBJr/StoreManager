const productsModel = require('../models/productsModel');

const validName = (name) => {
    if (name.length < 5 || typeof (name) !== 'string') return false;

  return true;
};

const validQuantity = (quantity) => {
    if (quantity <= 0) { return false; }
    return true;
};
const validTypeQuantity = (quantity) => {
    if (typeof (quantity) === 'string') { return false; }
    return true;
};

const getAllProducts = async () => {
    const products = productsModel.getAll();
    if (!products) {
        return null;
    }
    return products;
};

const getProductsById = async (id) => {
  //  console.log(id);
    const product = productsModel.getById(id);
    if (!product) {
        return null;
    }
    return product;
};
const createProduct = async ({ name, quantity }) => {
    const productExists = await productsModel.productsExists(name);
    if (productExists) {
         return false; 
}
    const response = await productsModel.create({ name, quantity });
    return response;
};

const updateProduct = async ({ id, name, quantity }) => {
    const productExists = await productsModel.productsExists(name);
    // console.log(productExists);
    if (productExists) {
        const response = await productsModel.update({ id, name, quantity });
         return response;
    }
    return false;
};

module.exports = { 
    createProduct,
     getAllProducts, 
     validName, 
     validQuantity, 
     validTypeQuantity,
     getProductsById,
     updateProduct,
     };
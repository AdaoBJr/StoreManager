const {
    newProduct,
    updateProduct,
    productsList,
    listById,
    deleteProduct,
} = require('../models/productModel');
const { productExists } = require('../middlewares/productsMiddlewares');

const createProduct = async ({ name, quantity }) => {
    const newProducts = await newProduct({ name, quantity });
    return newProducts;
};

const getAll = async () => {
    const products = await productsList();
    return products;
};
  
const getById = async (id) => {
    const product = await listById(id);
    return product;
};

const update = async ({ id, name, quantity }) => {
    const productUpdate = await updateProduct({ id, name, quantity });
    return productUpdate;
};

const remove = async ({ id }) => {
    const product = await productExists({ id });
  
    if (!product) {
        return product;
    }
    const { name, quantity, _id } = product;
    await deleteProduct({ id });
    return { name, quantity, _id };
};

module.exports = { createProduct, getAll, getById, update, remove };

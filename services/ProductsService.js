const productsModel = require('../models/ProductsModel');

const validateIfAlreadyExistsAndLength = async (name) => {
    const isExists = await productsModel.verifyIsAlreadyExists(name);
    if (isExists === true) {
        return { 
            err: {
                code: 'invalid_data',
                message: 'Product already exists',
            },
        };
    }
    if (name.length < 5) {
        return { 
            err: {
                code: 'invalid_data',
                message: '"name" length must be at least 5 characters long',
            },
        };
    }
};

const validateQuantity = async (quantity) => {
    if (quantity <= 0) {
        return {
            err: {
                code: 'invalid_data',
                message: '"quantity" must be larger than or equal to 1',
            },
        };
    }
    if (typeof quantity === 'string') {
        return {
            err: {
                code: 'invalid_data',
                message: '"quantity" must be a number',
            },
        };
    }
};

const addProduct = async (name, quantity) => {
    const productAdded = await productsModel.addNewProduct(name, quantity);
    return productAdded;
};

const getAllProducts = async () => {
    const getProducts = await productsModel.getAllProducts();
    console.log(getProducts);
    return getProducts;
};

const getProductById = async (id) => {
    const product = await productsModel.getProductById(id);
    if (!product) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        };
    }
    console.log(product);
    return product;
};

module.exports = {
    validateIfAlreadyExistsAndLength,
    validateQuantity,
    addProduct,
    getAllProducts,
    getProductById,
};

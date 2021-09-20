const { ObjectId } = require('mongodb');
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
                message: '"quantity" must be larger than or equal to 1' } };
    }
    if (typeof quantity === 'string') {
        return {
            err: {
                code: 'invalid_data',
                message: '"quantity" must be a number' } };
    }
};

const validateString = async (name) => {
    if (name.length < 5) {
        return { 
            err: {
                code: 'invalid_data',
                message: '"name" length must be at least 5 characters long',
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

// const validateIfIdAlreadyExists = async (id) => {
//     const result = await productsModel.verifyIfIdAlreadyExists(id);
//     if (result === false) {
//         return {
//             err: {
//                 code: 'invalid_data',
//                 message: 'Wrong id format',
//             },
//         };
//     }
//     return null;
// };

const getProductById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        };
    }
    const product = await productsModel.getProductById(id);
    if (product === null) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        };
    }
    return product;
};

const updateProduct = async (id, name, quantity) => {
    // if (!ObjectId.isValid(id)) {
    //     return {
    //         err: {
    //             code: 'invalid_data',
    //             message: 'Wrong id format',
    //         },
    //     };
    // }
    const update = await productsModel.updateProduct(id, name, quantity);
    return update;
};

const deleteProduct = async (id) => {
    if (!ObjectId.isValid(id)) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        };
    }
    const productDeleted = await productsModel.deleteProduct(id);
    console.log(productDeleted);
    if (!productDeleted) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            } };
    }
    return productDeleted;
};

module.exports = {
    validateIfAlreadyExistsAndLength,
    validateQuantity,
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    validateString,
};

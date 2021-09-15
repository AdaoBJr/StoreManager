const productsModel = require('../models/ProductsModel');

const validateIfAlreadyExistsAndLength = async (name) => {
    const isExists = await productsModel.verifyIsAlreadyExists(name);
    console.log(isExists);
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
// if (productsModel.verifyIsAlreadyExists(name)) {
//     return res.status(422).json({ err: {
//         code: 422,
//         message: 'Product already exists' } });
// }
// if (name.length < 5) {
//     return res.status(422).json({ err: {
//         code: 422,
//         message: '"name" length must be at least 5 characters long',
//     } });
// }
// if (quantity <= 0) {
//     return res.status(422).json({ err: {
//         code: 422,
//         message: '"name" length must be at least 5 characters long',
//     } });
// }

// const addNewProduct = (name, quantity) => {
//     switch (true) {
//         case productsModel.verifyIsAlreadyExists(name): return res.status(422).json({ err: {
//             code: 422, message: 'Product already exists' } });
//         case name.length < 5: return res.status(422).json({ err: {
//             code: 422, message: '"name" length must be at least 5 characters long' } });
//         case quantity <= 0: return res.status(422).json({ err: {
//             code: 422, message: '"quantity" must be larger than or equal to 1' } });
//         case typeof quantity === 'string': return res.status(422).json({ err: {
//             code: 422, message: '"quantity" must be a number' } });
//         default: {
//             const result = productsModel.addNewProduct(name, quantity);
//             return result;
//         } 
//     }
// };

module.exports = {
    validateIfAlreadyExistsAndLength,
    validateQuantity,
    addProduct,
};

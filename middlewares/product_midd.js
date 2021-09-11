const connection = require('../model/connection');

const NameValidation = async (req, res, next) => {
    const { name } = req.body;

    if (name.length < 5) {
        return res.status(422).json({ err: { 
            code: 'invalid_data', message: '"name" length must be at least 5 characters long' } });
    }
    next();
};

const ExistingProduct = async (req, res, next) => {
    const db = await connection();

    const { name } = req.body;

    const productExist = await db.collection('products').findOne({ name });
    console.log(productExist);

    if (productExist) {
        return res.status(422).json({ err: { 
            code: 'invalid_data', message: 'Product already exists' } });
    }

    next();
};

const QuantityValidation = async (req, res, next) => {
    const { quantity } = req.body;
    console.log(quantity, 'numero');
    if (quantity <= 0) {
        return res.status(422).json({ err: { 
            code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });
    }

    if (typeof quantity !== 'number') {
        return res.status(422).json({ err: { 
            code: 'invalid_data', message: '"quantity" must be a number' } });
    }
    next();
};

module.exports = {
    NameValidation,
    ExistingProduct,
    QuantityValidation,
};
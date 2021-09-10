const productsService = require('../services/productsService');

const validName = (req, res, next) => {
    const { name } = req.body;
    const nameVerified = productsService.validName(name);
    console.log(nameVerified);
    if (!nameVerified) {
        return res.status(422).json({
            err: {
                code: 'invalid_data',
                message: '"name" length must be at least 5 characters long',
            },
        });
    }
    next();
};

const validQuantity = (req, res, next) => {
    const { quantity } = req.body;
    const quantityVerified = productsService.validQuantity(quantity);
    if (!quantityVerified) {
        return res.status(422).json({
            err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' }, 
        });
    }
    next();
};
const validTypeQuantity = (req, res, next) => {
    const { quantity } = req.body;
    const quantityTypeVerified = productsService.validTypeQuantity(quantity);
    if (!quantityTypeVerified) {
        return res.status(422).json({
            err: { 
                code: 'invalid_data',
                 message: '"quantity" must be a number' }, 
        });
    }
    next();
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const createProducts = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        const result = await productsService.createProduct({ name, quantity });

        if (!result) {
            return res.status(422).json({ 
                err: { code: 'invalid_data', message: 'Product already exists' } });
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { getAllProducts, createProducts, validName, validQuantity, validTypeQuantity };
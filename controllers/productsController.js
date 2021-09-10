const productsService = require('../services/productsService');

const validName = (req, res, next) => {
    const { name } = req.body;
    const nameVerified = productsService.validName(name);
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
                message: '"quantity" must be a number',
            },
        });
    }
    next();
};

const getAllProducts = async (req, res) => {
    try {
        const Allproducts = await productsService.getAllProducts();
        return res.status(200).json({ products: Allproducts });
    } catch (error) {
        return res.status(422).json({
            err: {
                code: 'invalid_data',
                message: 'Wrong id format ',
            },
        });
    }
};

const getAProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsService.getProductsById(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(422).json({
            err: {
                code: 'invalid_data',
                message: 'Wrong id format',
            },
        });
    }
};

const createProducts = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        const result = await productsService.createProduct({ name, quantity });

        if (!result) {
            return res.status(422).json({
                err: { code: 'invalid_data', message: 'Product already exists' },
            });
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, quantity } = req.body;
        const result = await productsService.updateProduct({ id, name, quantity });
        console.log(result);
        if (result) {
            console.log('entrei422');
            return res.status(422).json({
                err: { code: 'invalid_data', message: 'Product already exists' },
            });
        }
        return res.status(200).json({ _id: id, name, quantity });
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = {
    getAllProducts,
    createProducts,
    validName,
    validQuantity,
    validTypeQuantity,
    getAProductById,
    updateProduct,
};
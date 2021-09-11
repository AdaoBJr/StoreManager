const controller = require('../controllers/products');

const verifyName = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 5) {
        return res.status(422)
        .json({
            err: {
                code: 'invalid_data',
                message: '"name" length must be at least 5 characters long',
            },
        });
    }
    next();
};

const verifyExist = async (req, res, next) => {
    const { name } = req.body;
    const exists = await controller.exists(name);
    console.log(exists);
    if (exists) {
        return res.status(422)
        .json({
            err: {
                code: 'invalid_data',
                message: 'Product already exists',
            },
        });
    }
    next();
};

const verifyNumber = (req, res, next) => {
    const { quantity } = req.body;
    if (typeof quantity !== 'number') {
        return res.status(422)
        .json({
            err: {
                code: 'invalid_data',
                message: '"quantity" must be a number',
            },
        });
    }
    next();
};

const verifyQnt = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity <= 0) {
        return res.status(422)
        .json({
            err: {
                code: 'invalid_data',
                message: '"quantity" must be larger than or equal to 1',
            },
        });
    }
    next();
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const response = await controller.create(name, quantity);
    return res.status(201).json(response);
};

module.exports = { verifyName, verifyExist, verifyNumber, verifyQnt, createProduct };
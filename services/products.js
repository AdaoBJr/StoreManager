const { ObjectId } = require('mongodb');
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

const findAll = async (_req, res) => {
    const response = await controller.findAll();
    const out = {
        products: response,
    };
    console.log(out);
    res.status(200).json(out);
};

const idValidate = (req, res, next) => {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
        return res.status(422).json({
        err: {
            code: 'invalid_data',
            message: 'Wrong id format',
            },
        });
    }
    next();
};

const findById = async (req, res) => {
    const { id } = req.params;
    const response = await controller.findById(id);
    res.status(200).json(response);
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const response = await controller.create(name, quantity);
    return res.status(201).json(response);
};

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const response = await controller.edit(name, quantity, id);
    return res.status(200).json(response);
};

module.exports = {
    verifyName,
    verifyExist,
    verifyNumber,
    verifyQnt,
    createProduct,
    findAll,
    idValidate,
    findById,
    editProduct,
 };
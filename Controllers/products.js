const service = require('../Services/products');

const create = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await service.create(name, quantity);
    return res.status(201).json(result);
};

module.exports = create;

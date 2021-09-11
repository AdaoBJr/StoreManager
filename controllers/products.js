const models = require('../models/products');

const exists = async (name) => {
    const have = await models.findOne(name);
    if (have !== null) return true;
    
    return false;
};

const create = (name, quantity) => {
    models.createOne(name, quantity);
    return models.findOne(name);
};

module.exports = { create, exists };

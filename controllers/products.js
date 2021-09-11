const { ObjectId } = require('mongodb');
const models = require('../models/products');

const exists = async (name) => {
    const have = await models.findByName(name);
    if (have) return true;
    return false;
};

const create = async (name, quantity) => {
    await models.createOne(name, quantity);
    return models.findByName(name);
};

const findById = (id) => models.findById(new ObjectId(id));

const edit = async (name, quantity, id) => {
    await models.editOne(name, quantity, id);
};

const findAll = () => models.findAll();

module.exports = { create, edit, exists, findById, findAll };

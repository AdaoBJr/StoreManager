const model = require('../models/productModel');
const service = require('../services/productService');

const idError = { err: { code: 'invalid_data', 
message: 'Wrong id format' } };

const nameError = { err: { code: 'invalid_data', 
message: '"name" length must be at least 5 characters long' } };

const numberError = { err: { code: 'invalid_data', 
message: '"quantity" must be a number' } };

const getAllProducts = async (_req, res) => {
  try {
    const products = await model.getAll();
    return res.status(200).json({ products });
  } catch (err) {
      return res.status(422).json(idError);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = service.readProduct(id);
    if (exists === null) {
      return res.status(422).json(idError);
    }
    const product = await model.getOne(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(422).json(idError);
  }
};

const isNumber = (value) => !Number.isNaN(Number(value));

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const createdProduct = await service.createProduct({ name, quantity });
    if (name.length < 5) {
      return res.status(422).json(nameError); 
     }
    if (createdProduct === null) {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: 'Product already exists' } });
    }
    if (quantity <= 0) {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: '"quantity" must be larger than or equal to 1' } });
    }
    if (!isNumber(quantity)) {
      return res.status(422).json(numberError);
    }
    return res.status(201).json(createdProduct);
  }; 

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await model.update({ id, name, quantity });
    if (name.length < 5) res.status(422).json(nameError); 
     
    if (updatedProduct === null) {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: 'Product already exists' } });
    }
    if (quantity <= 0) {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: '"quantity" must be larger than or equal to 1' } });
    }
    if (!isNumber(quantity)) {
      return res.status(422).json(numberError);
    }
    return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await service.readProduct(id);

    if (exists === null) {
      return res.status(422).json(idError); 
}

    await model.exclude(id);

    res.status(200).json(exists);
  } catch (err) {
    return res.status(422).json(idError);
  }
 };

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};

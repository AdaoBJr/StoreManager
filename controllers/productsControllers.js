const { createProduct, getAll, getById, remove, update } = require('../services/productServices');

const addProduct = async (req, res) => {
    const { name, quantity } = req.body;
  
    const product = await createProduct({ name, quantity });
    return res.status(201).json(product);
};

const listAll = async (req, res) => {
    const products = await getAll();
    return res.status(200).json({ products });
};

const productById = async (req, res) => {
    const { id } = req.params;
    const products = await getById(id);
    if (products.status === 200) {
      return res.status(200).json(products.produto);
    }
    return res.status(products.status).json(products.err);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    const deleted = await remove({ id });
  
    if (deleted) {
      return res.status(200).json(deleted);
    }
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' } });
  };

const updateProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
  
    await update({ id, name, quantity });
    return res.status(200).json({ id, name, quantity });
};

module.exports = { addProduct, listAll, productById, deleteProduct, updateProduct };
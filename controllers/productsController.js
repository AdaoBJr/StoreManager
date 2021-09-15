const { createP, deleteP, getAllP, getProId, updateP } = require('../services/productsService');

const createProd = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await createP({ name, quantity });
  return res.status(201).json(product);
};
const updateProd = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  await updateP({ id, name, quantity });
  return res.status(200).json({ id, name, quantity });
};
const deleteProd = async (req, res) => {
  const { id } = req.params;
  const deletado = await deleteP({ id });
  if (deletado) return res.status(200).json(deletado);
  return res.status(422).json({
    err: { code: 'invalid_data', message: 'Wrong id format' }
  });
};
const getAllProd = async (req, res) => {
  const products = await getAllP();
  return res.status(200).json({ products });
};
const getProdId = async (req, res) => {
  const { id } = req.params;
  const products = await getProId(id);
  if (products.status === 200) return res.status(200).json(products.product);
  return res.status(products.status).json(products.err);
};

module.exports = {
  createProd,
  updateProd,
  deleteProd,
  getAllProd,
  getProdId
};

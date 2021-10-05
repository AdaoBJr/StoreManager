const {
  addProduct,
  getProducts,
  getProductWithId,
  updateProductWithId,
  deleteProductWithId,
} = require('../services/productsService');

const newProduct = async (req, res, next) => {
  try {
    const product = await addProduct(req.body);
    
    return res.status(201).json({ ...product });
  } catch (err) {
    return next(err);
  }
};

const allProducts = async (_req, res, next) => {
  try {
    const products = await getProducts();
    
    return res.status(200).json({ products });
  } catch (err) {
    return next(err);
  }
};

const productWithId = async (req, res, next) => {
  try {
    const product = await getProductWithId(req.params);
    
    return res.status(200).json({ ...product });
  } catch (err) {
    return next(err);
  }
};

const updateWithId = async (req, res, next) => {
  try {
    const product = await updateProductWithId(req.params, req.body);
    
    return res.status(200).json({ ...product });
  } catch (err) {
    return next(err);
  }
};

const deleteWithId = async (req, res, next) => {
  try {
    await deleteProductWithId(req.params);
    
    return res.status(200).json({ _id: req.params.id });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newProduct,
  allProducts,
  productWithId,
  updateWithId,
  deleteWithId,
};

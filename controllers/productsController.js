const {
  servCreateProduct,
  servListProducts,
  servListByID,
  servUpdater,
  servEraser,
 } = require('../services/productService');

const contCreateProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await servCreateProduct(name, quantity);
    if (result.err) {
      return res.status(result.code).json({ ...result });
    }
 return res.status(result.code).json(result.prod);
};

const contEraser = async (req, res) => {
  const { id } = req.params;
  const result = await servEraser(id);
  if (result.err) {
    return res.status(result.code).json({ ...result });
  }
  return res.status(result.code).json(result.prod);
};

const contUpdater = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const result = await servUpdater(id, name, quantity);
  if (result.err) {
    return res.status(result.code).json({ ...result });
  }
return res.status(result.code).json(result.prod);
};

const contListProducts = async (req, res) => {
  const result = await servListProducts();
  return res.status(result.code).json(result.prod);
};

const contListByID = async (req, res) => {
 const { id } = req.params;
 const result = await servListByID(id);
 if (result.err) {
  return res.status(result.code).json({ ...result });
}
  return res.status(result.code).json(result.prod);
};

module.exports = {
  contCreateProduct,
  contListProducts,
  contListByID,
  contUpdater,
  contEraser,
};
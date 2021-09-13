const service = require('../services/productService');
const messages = require('../helpers/validationMessages');

const getProducts = async (_req, res) => {
  try {
    const products = await service.getAllProducts();

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(messages.error);
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);

    if (product === null) return res.status(422).json(messages.productWrongFormat);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(422).json(messages.productWrongFormat);
  }
};

const createProduct = async (req, res) => {
  // try {
    const { name, quantity } = req.body;
    const result = await service.createProduct({ name, quantity });

    if (service.lengthOfName(name) === false) {
      res.status(422).json(messages.productNameLength);
    }

    if (result === null) return res.status(422).json(messages.productAlreadyExists);

    if (service.numberOfQuantity(quantity) === false) {
      res.status(422).json(messages.productNumberQuantity);
    }

    if (service.typeOfQuantity(quantity) === false) {
      res.status(422).json(messages.productTypeQuantity);
    }

    return res.status(201).json(result);
  // } catch (err) {
  //   return res.status(500).json(messages.error);
  // }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await service.updateProduct({ id, name, quantity });

    if (service.lengthOfName(name) === false) {
      res.status(422).json(messages.productNameLength);
    }

    if (service.numberOfQuantity(quantity) === false) {
      res.status(422).json(messages.productNumberQuantity);
    }

    if (service.typeOfQuantity(quantity) === false) {
      res.status(422).json(messages.productTypeQuantity);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(messages.error);
  }
};

const excludeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const exclude = await service.excludeProduct(id);

    if (exclude === null) return res.status(422).json(messages.productWrongFormat);

    return res.status(200).json(exclude);
  } catch (error) {
    return res.status(422).json(messages.productWrongFormat);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  excludeProduct,
};

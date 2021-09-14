const { 
  createProduct,
  receiveProductsList,
  receiveProductById,
  attProductById,
} = require('../Services/Products');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await createProduct(name, quantity);

  if (product === true) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  return res.status(201).json(product);
};

const listAllProducts = async (_req, res) => {
  const fullProductList = await receiveProductsList();

  return res.status(200).json({ products: fullProductList });
};

const listProductById = async (req, res) => {
  const { id } = req.params;

  const productById = await receiveProductById(id);

  if (productById) {
    return res.status(200).json(productById);
  }

  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProductById = await attProductById(id, name, quantity);

  if (updatedProductById) {
    return res.status(200).json(updatedProductById);
  }

  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
};

module.exports = {
  addProduct,
  listAllProducts,
  listProductById,
  updateProductById,
};

const service = require('../services/productService');
const messages = require('../helpers/validationMessages');

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
  // } catch (error) {
  //   return res.status(500).json({ message: 'Ops, an error occurred with your request' });
  // }
};

module.exports = {
  createProduct,
};

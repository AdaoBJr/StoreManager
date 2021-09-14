const { getAll, add, getById, update, exclude } = require('../models/productModel');
const service = require('../services/productService')

const getAllProducts = async (_req, res) => {
  try {
    const dados = await getAll();
    return res.status(200).json({ dados });
  } catch (err) {
    return res.status(500).json({ err });
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const createdProduct = await service.createProduct({name, quantity} )

    if(name.length < 5)
      return res.status(422).json({"err": { "code": "invalid_data", "message": '"name" length must be at least 5 characters long'}})

    if (createdProduct=== null) {
      return res.status(422).json({"err": { "code": "invalid_data", "message": 'Product already exists'}})
    }

    if (quantity <= 0) {
      return res.status(422).json({"err": { "code": "invalid_data", "message": '"quantity" must be larger than or equal to 1'}})
    }

    if (isNaN(quantity)) {
      return res.status(422).json({"err": { "code": "invalid_data", "message": '"quantity" must be a number'}})
    }

    return res.status(201).json(createdProduct);
  } catch (err) {
    return res.status(500).json({message: "deu ruim"});
  }
} 

const updateProduct = async (req, res) => {

  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await update({ id, name, quantity })

    if (!updatedProduct)
      return res.status(400).json({ message: 'Erro' })

    return res.status(201).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ err });
  }
}

const deleteProduct = async (req, res) => {
  try{
    const { id } = req.params;
    const deleteProduct = await exclude(id);

    if(!deleteProduct)
      return res.status(400).json({ message: 'Erro' });

    return res.status(204).send();


  } catch (err) {
    return res.status(500).json({ err });
  }
 }

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}

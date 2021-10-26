// Importação do express-rescue
const rescue = require('express-rescue');
// Importação do joi (validação)
const Joi = require('joi');
// Importação do ObjectID do mongodb
const { ObjectID } = require('mongodb');

// Objeto com http status code
const HTTP_STATUS_CODE = {
  ok: 200,
  created: 201,
  unprocessableEntity: 422,
};

// Importação do productsService
const productsService = require('../services/productsServices');

// Realiza a criação de um produto
const create = rescue(async (req, res, next) => {
  // Pega o nome e a quantidade do corpo da requisição
  const { name, quantity } = req.body;

  // Utiliza a lib joi para criar um objeto e validar os dados informados
  const { error } = Joi.object({
    // Exige que o name seja uma string com o min de 5 caracteres e ela não pode ser null ou vazia
    name: Joi.string().min(5).required(),
    // Exige que o quantity seja um número com a quantia min de 1 e ele não pode ser null ou vazio
    quantity: Joi.number().min(1).required(),
    // Realiza a validação com as informações passadas no corpo da requisição
  }).validate(req.body);
  // Verifica se houve algum erro na validação das informações
  if (error) { return next(error); }
  // Realiza uma busca com o nome do produto para ver se existe algum igual
  const productExists = await productsService.findByName(name);
  // Verifica se o produto passado ja existe
  if (productExists) {
    // Caso ja exista retorna uma mensagem de erro com o status code
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }
  // Cria um novo produto caso tudo esteja ok
  const newProduct = await productsService.create(name, quantity);
  // Verifica se houve algum erro durante a criação
  if (newProduct.err) { return next(newProduct.err); }
  // Retorna o status code e o produto que foi criado
  return res.status(HTTP_STATUS_CODE.created).json(newProduct);
});

// Realiza a listagem de todos os produtos
const getAll = rescue(async (_req, res, _next) => {
  // Chama o productsService getAll para listar todos os produtos
  const products = await productsService.getAll();
  // Retorna o status code com a lista de produtos
  return res.status(HTTP_STATUS_CODE.ok).json(products);
});

// Realiza a listagem de um produto pelo id
const getById = rescue(async (req, res, _next) => {
  // Pega o id informado na url da requisição
  const { id } = req.params;
  // Verifica se o id informado é válido
  if (!ObjectID.isValid(id)) {
    // Retorna o status code com uma mensagem de erro caso não seja válido
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({ err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  // Realiza a busca do produto
  const product = await productsService.getById(id);
  // Verifica se houve resposta na busca do produto
  if (!product) {
    // Retorna uma mensagem de erro com o status code caso não encontre o produto
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  // Caso esteja tudo ok retorna o produto com o id informado
  return res.status(HTTP_STATUS_CODE.ok).json(product);
});

// Atualiza um produto através do id informado
const updateById = rescue(async (req, res, next) => {
  // Pega o id informado na url da requisição
  const { id } = req.params;
  // Pega o name e a quantity informado no corpo da requisição
  const { name, quantity } = req.body;
  // Utiliza a lib joi para criar um objeto e validar os dados informados
  const { error } = Joi.object({
    // Exige que o name seja uma string com o min de 5 caracteres e ela não pode ser null ou vazia
    name: Joi.string().min(5).required(),
    // Exige que o quantity seja um número com a quantia min de 1 e ele não pode ser null ou vazio
    quantity: Joi.number().min(1).required(),
    // Realiza a validação com as informações passadas no corpo da requisição
  }).validate(req.body);
  // Verifica se houve algum erro na validação das informações
  if (error) { return next(error); }
  // Realiza uma busca com o id do produto para ver se ele existe
  const verify = await productsService.getById(id);
  // Caso não exista retorna uma mensagem de erro com o status code
  if (!verify) {
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
      err: { code: 'invalid_data', message: 'Product doesn\'t exist' },
    });
  }
  // Caso esteja tudo ok atualiza o produto
  const updated = await productsService.updateById(id, name, quantity);
  // Verifica se houve algum erro durante a atualização
  if (updated.err) { return next(updated.err); }
  // Retorna o status code e o produto que foi atualizado
  return res.status(HTTP_STATUS_CODE.ok).json({ _id: id, name, quantity });
});

// Deleta um produto atarvés do id informado
const deleteById = rescue(async (req, res, _next) => {
  // Pega o id informado na url da requisição
  const { id } = req.params;
  // Verifica se o id informado tem um formato válido
  if (!ObjectID.isValid(id)) {
    // Retorna o status code e a mensagem de erro caso o id seja inválido
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({ err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  // Busca o produto com o id informado
  const product = await productsService.getById(id);
  // Deleta o produto informado
  await productsService.deleteById(id);
  // Retorna o status code e o produto que foi deletado
  return res.status(HTTP_STATUS_CODE.ok).json(product);
});

// Exportação padrão das funções
module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};

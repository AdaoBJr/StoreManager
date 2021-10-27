// Importação do express-rescue
const rescue = require('express-rescue');
// Importação do ObjectID do mongodb
const { ObjectID } = require('mongodb');

// Objeto com http status code
const HTTP_STATUS_CODE = {
  ok: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
};

// Importação dos services
const productsService = require('../services/productsServices');
const salesService = require('../services/salesService');

// Verifica se um produto existe
const verifyExistenceProduct = async (id) => {
  try {
    // Chama o productService para buscar o produto pelo id
    const verifyId = await productsService.getById(id);
    // Verifica se houve a resposta e retorna true
    if (verifyId) { return true; }
    // Retorna false caso não exista
    return false;
    // Retorna false caso algum erro aconteça
  } catch (err) { return false; }
};

// Verifica cada produto do array informado na venda
const verifySalesEntry = async (product) => {
  // Pega as informações do produto
  const { productId, quantity } = product;
  // Verifica se o produto informado existe, pelo id
  const verifyId = await verifyExistenceProduct(productId);
  // Verifica o resultado da busca do produto e se a quantidade é um number maior ou igual a 1
  const response = verifyId && typeof quantity === 'number' && quantity >= 1;
  // Retorna a resposta
  return response;
};

// https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
// Recebe um array de produtos para cadastrar uma venda
// Função para resolver a iteração de promises
const verifySalesArray = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await verifySalesEntry(entry);
    return response;
  });
  // Verifica o conjunto de promises
  const validation = await Promise.all(promisesArray);
  // Retorna o resultado
  return validation;
};

// Realiza a subtração da quantidade de produtos
const subtractSoldQuantities = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await productsService.subtractProductsQuantity(entry);
    return response;
  });

  const validation = await Promise.all(promisesArray);
  return validation;
};

// Realiza a adição da quantidade de produtos quando uma venda é excluida
const addSoldQuantities = async (id) => {
  // Busca a venda pelo id
  const sale = await salesService.getById(id);
  // Pega os itens vendidos
  const array = sale.itensSold;

  const promisesArray = array.map(async (entry) => {
    const response = await productsService.addProductsQuantity(entry);

    return response;
  });

  const validation = await Promise.all(promisesArray);

  return validation;
};

// Constante para verificação de resultado true
const isTrue = (element) => element === true;
// Constante para verificação de quantia masior que 0
const validateQuantities = (element) => element > 0;

// Realiza o cadastro de uma venda
const create = rescue(async (req, res, _next) => {
  // Pega o array de produtos do corpo da requisição
  const productsArray = req.body;
  // Chama a função para iterar o array de promises
  const validation = await verifySalesArray(productsArray);
  // Verifica se o resultado de todas as iterações é true
  const response = validation.every(isTrue);
  // Retorna erro caso seja necessário
  if (!response) {
        return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
          err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
          } });
  }
  // Realiza a subtração das quantidades dos produtos
  const newQuantities = await subtractSoldQuantities(productsArray);
  // Verifica se as quantias restantes são válidas
  const validQuantities = newQuantities.every(validateQuantities);
  // Caso a quantia restante seja menor que 1 retorna erro
  if (!validQuantities) {
    return res.status(HTTP_STATUS_CODE.notFound).json({ err: { code: 'stock_problem',
    message: 'Such amount is not permitted to sell' } });
  }
  // Cria a venda caso tudo esteja ok
  const created = await salesService.create(productsArray);
  // Retorna a resposta com o status code
  return res.status(HTTP_STATUS_CODE.ok).json(created);
});

// Realiza a listagem de todas as vendas
const getAll = rescue(async (_req, res, _next) => {
  const response = await salesService.getAll();

  return res.status(HTTP_STATUS_CODE.ok).json(response);
});

// Realiza a busca de uma venda pelo id
const getById = rescue(async (req, res, _next) => {
  // Pega o id informado na URL da requisição
  const { id } = req.params;
  // Verifica se o id informado é válido
  if (!ObjectID.isValid(id)) {
    // Retorna erro caso seja necessário
    return res.status(HTTP_STATUS_CODE.notFound).json({
      err: { code: 'not_found', message: 'Sale not found' },
    });
  }
  // Busca a venda pelo id
  const response = await salesService.getById(id);
  // Verifica a resposta
  if (!response) {
    // Retorna erro caso não seja encontrada a venda
    return res.status(HTTP_STATUS_CODE.notFound).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  // Retorna a resposta e staus code caso tudo esteja ok
  return res.status(HTTP_STATUS_CODE.ok).json(response);
});

// Realiza a atualização de uma venda
const update = rescue(async (req, res, _next) => {
  // Pega o id informado na URL da requisição
  const { id } = req.params;
  // Pega a venda informada no corpo da requisição
  const sale = req.body;
  // Verifica cada objeto do array
  const validation = await verifySalesArray(sale);
  // Verifica se todos os resultados foram true
  const verify = validation.every(isTrue);
  // Verifica o resultado das  validações
  if (!verify) {
    // Retorna erro caso seja necessário
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  // Realiza a aatualização da venda
  await salesService.update(id, sale);
  // Busca a nova venda pelo id
  const newSale = await salesService.getById(id);
  // Retorna a nova venda e o staus code
  return res.status(HTTP_STATUS_CODE.ok).json(newSale);
});

// Realiza a exclusão de uma venda
const deleteById = rescue(async (req, res, _next) => {
  // Pega o id informado na URL da requisição
  const { id } = req.params;
  // Verifica se o id informado é válido
  if (!ObjectID.isValid(id)) {
    // Retorna erro caso seja necessário
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
  // Busca a venda pelo id
  const verifyExistence = await salesService.getById(id);
  // Verifica a resposta
  if (!verifyExistence) {
    // Retorna erro caso seja necessário
    return res.status(HTTP_STATUS_CODE.unprocessableEntity).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
  // Retorna as quantidades dos produtos que tinham sido vendidos
  await addSoldQuantities(id);
  // Realiza a exclusão
  await salesService.deleteById(id);
  // Retorna a resposta com o status code caso tudo esteja ok
  return res.status(HTTP_STATUS_CODE.ok).json(verifyExistence);
});

// Exportação padrão
module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};

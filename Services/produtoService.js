const produtoModel = require('../Models/produtoModel');
const validacoes = require('../validacoes/validacaoProduto');

const cadastrarProdutoServices = async (name, quantity) => {
  const produtoExiste = await produtoModel.buscaProdutoPorNome(name);
  const verificacao = validacoes.validacaoCadastramentoProduto(name, quantity, produtoExiste);

  if (verificacao) {
    return verificacao;
  }

  const result = await produtoModel.cadastrarProdutoModel(name, quantity);
  return result;
};

const buscarTodosProdutoServices = async () => {
  const result = await produtoModel.buscarTodosProdutoModel();

  return result;
};

const buscarProdutoPorIDServices = async (id) => {
  const result = await produtoModel.buscarProdutoPorIDModel(id);

  if (!result) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return result;
};

const atualizarProdutoServices = async (id, name, quantity) => {
  const FALSE = false;

  const verificacao = validacoes.validacaoCadastramentoProduto(name, quantity, FALSE);
  
  if (verificacao) {
    return verificacao;
  }

  const result = await produtoModel.atualizarProdutoModel(id, name, quantity);

  return result;
};

const deleteProdutoServices = async (id) => {
  const produto = await produtoModel.buscarProdutoPorIDModel(id);

  if (!produto) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  await produtoModel.deleteProdutoModel(id);

  return produto;
};

module.exports = { 
cadastrarProdutoServices, 
buscarTodosProdutoServices,
buscarProdutoPorIDServices,
atualizarProdutoServices,
deleteProdutoServices,
};
const produtoModel = require('../Models/produtoModel');
const validacoes = require('../validacoes/validacaoProduto');

const cadastrarProdutoServices = async ({ name, quantity }) => {
  const produtoExiste = await produtoModel.buscaProdutoPorNome(name);
  const verificacao = validacoes.validacaoCadastramentoProduto(name, quantity, produtoExiste);

  if (verificacao) {
    return verificacao;
  }

  const result = await produtoModel.cadastrarProdutoModel({ name, quantity });
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

module.exports = { 
cadastrarProdutoServices, 
buscarTodosProdutoServices,
buscarProdutoPorIDServices,
};
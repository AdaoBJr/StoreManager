const produtoModel = require('../Models/produtoModel');
const validacoes = require('../validacoes/validacaoProduto');

const cadastrarProdutoServices = async ({ name, quantity }) => {
  const produtoExiste = await produtoModel.buscaProduto(name);
  const verificacao = validacoes.validacaoCadastramentoProduto(name, quantity, produtoExiste);

  if (verificacao) {
    return verificacao;
  }

  const result = await produtoModel.cadastrarProdutoModel({ name, quantity });
  return result;
};

module.exports = { cadastrarProdutoServices };
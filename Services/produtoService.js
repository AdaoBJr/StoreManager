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

const cadastrarVendaServices = async (arrayVendas) => {
  const verificacao = validacoes.validacaoCadastramentoVenda(arrayVendas);

  if (verificacao.every((i) => i !== false)) {
    return verificacao.find((i) => 'err' in i);
  }

  const result = await produtoModel.cadastrarVendaModel({ itensSold: arrayVendas });
  return result;
};

const buscarVendaIDServices = async (id) => {
  const result = await produtoModel.buscarVendaIDModel(id);

  if (!result) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
  }

  return result;
};

const buscarTodasVendaServices = async () => {
  const result = await produtoModel.buscarTodasVendaModel();

  return result;
};

const atualizarVendaServices = async (id, itensSold) => {
  const verificacao = validacoes.validacaoDadosVenda(itensSold[0].quantity);
  
  if (verificacao) {
    return verificacao;
  }

  const result = await produtoModel.atualizarVendaModel(id, itensSold);

  return result;
};

module.exports = { 
cadastrarProdutoServices, 
buscarTodosProdutoServices,
buscarProdutoPorIDServices,
atualizarProdutoServices,
deleteProdutoServices,
cadastrarVendaServices,
buscarVendaIDServices,
buscarTodasVendaServices,
atualizarVendaServices,
};
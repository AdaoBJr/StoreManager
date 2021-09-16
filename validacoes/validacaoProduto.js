const errors = {
  maisQueCincoCaracteres: '"name" length must be at least 5 characters long',
  produtoExistente: 'Product already exists',
  quantidadeMenorOuIgualZero: '"quantity" must be larger than or equal to 1',
  quantidadeNumber: '"quantity" must be a number',
};

const verificacaoNumeroCaracteres = (valor, min) => (valor.length <= min);
// const isString = (valor) => (typeof valor !== 'string');
const verificacaoMinimo = (numero, min) => (numero <= min);
const isNumber = (valor) => (typeof valor !== 'number');

const validacaoCadastramentoProduto = (name, quantity, produtoExiste) => {
  switch (true) {
    case verificacaoNumeroCaracteres(name, 5):
      return { err: { code: 'invalid_data', message: errors.maisQueCincoCaracteres } };
    case produtoExiste !== false:
      return { err: { code: 'invalid_data', message: errors.produtoExistente } };
    case verificacaoMinimo(quantity, 0):
      return { err: { code: 'invalid_data', message: errors.quantidadeMenorOuIgualZero } };
    case isNumber(quantity):
      return { err: { code: 'invalid_data', message: errors.quantidadeNumber } };    
    default: return false;
  }
};

const validacaoDadosVenda = (quantity) => {
  switch (true) {
    case verificacaoMinimo(quantity, 0):
      return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    case isNumber(quantity):
      return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };    
    default: return false;
  }
};

const validacaoCadastramentoVenda = (array) => 
  array.map((i) => validacaoDadosVenda(i.quantity));

module.exports = { validacaoCadastramentoProduto, validacaoCadastramentoVenda };
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
  const code = 422;

  switch (true) {
    case verificacaoNumeroCaracteres(name, 5):
      return { code, message: errors.maisQueCincoCaracteres };
    case produtoExiste !== false:
      return { code, message: errors.produtoExistente };
    case verificacaoMinimo(quantity, 0):
      return { code, message: errors.quantidadeMenorOuIgualZero };
    case isNumber(quantity):
      return { code, message: errors.quantidadeNumber };    
    default: return false;
  }
};

module.exports = { validacaoCadastramentoProduto };
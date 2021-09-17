// calculos, validações, regras de negocios
// recebe dados do controler trata os dados e envia pro model e vice versa
const validateName = (name) => {
  if (!name) return null;
  if (name.length < 5) return 'nome invalido';

  return name;
};
const validateQty = () => {};
const validateID = () => {};

module.exports = {
  validateName,
  validateQty,
  validateID,
};

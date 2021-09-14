// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/validacoes/7de27237-463f-4f28-8ea2-8a4e41f848a3?use_case=side_bar

const validatePostProduct = ({ name, quantity }) => {
  const errors = {
    nameMinimunSizeFive: '"name" length must be at least 5 characters long',
    quantityMinimumOne: '"quantity" must be larger than or equal to 1',
    quantityTypeNumber: '"quantity" must be a number',
  };

  if (name.length < 5) return { code: 422, message: errors.nameMinimunSizeFive };

  if (quantity < 1) return { code: 422, message: errors.quantityMinimumOne };

  if (typeof quantity === 'string') return { code: 422, message: errors.quantityTypeNumber };

  return {};
};

module.exports = { validatePostProduct };
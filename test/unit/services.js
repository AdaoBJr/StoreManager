const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productService');
const salesService = require('../../services/salesServices');

const productMock = {
  _id: '60d9d6c88c0eae36f26bd7f9',
  name: 'produto teste',
  quantity: 1
}

const saleMock = [
  {
    productId: '60d9d6c88c0eae36f26bd7f9',
    quantity: 10
  }
];

describe('Testa products service', async () => {
  it('valida produto', async () => {
    const response = await productsService.validateProduct(productMock);
    const err = await productsService.validateProduct('quero erro');
    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('name');
    expect(response).to.have.property('quantity');
  });

  it('valida produto para dar update', async () => {
    const response = await productsService.validateToUpdate(productMock);
    const err = await productsService.validateToUpdate('quero erro');
    expect(response).to.be.a('object');
  });

  it('pegar todos os produtos cadastrados', async () => {
    const response = await productsService.getProduct(productMock._id);
    expect(response).to.be.a('array');
  });

  it('valida para deletar', async () => {
    const response = await productsService.validateToDelete(productMock._id);
  });
});

describe('Testa sales service', async () => {
  it('valida venda', async () => {
    const response = await salesService.validateProducts(saleMock);
    const err = await salesService.validateToUpdate('quero erro');
    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  it('todas as vendas', async () => {
    const response = await salesService.getAllSales();
    expect(response).to.be.a('array');
  });

  it('valida para update', async () => {
    const response = await salesService.validateToUpdate(saleMock);
    const err = await salesService.validateToUpdate('quero erro');
    expect(response).to.be.a('object');
  });

  it('valida para deletar', async () => {
    const response = await salesService.validateToDelete(saleMock._id);
  });
});

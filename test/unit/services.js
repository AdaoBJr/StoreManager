const sinon = require('sinon');
const { expect } = require('chai');
const mongoConnection = require('../../models/connection');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');
const getConnection = require('./mockConnection');

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
  it('valida existencia de um produto', async () => {
    const response = await productsService.validateExistanceService(productMock);
    expect(response).to.be.equal(false);

  });

  it('valida criar um produto', async () => {
    const response = await productsService.createProductService(productMock);
    const { code } = await productsService.createProductService('erro');
    expect(response).to.be.a('object');
    // expect(code).to.have.property('code');
    // expect(code).to.be.equal('invalid_data');
  });

  it('Testa se o nome é string e tamanho maior que 5', async () => {
    const name = await productsService.validateNameService('Nome');
    expect(name).to.be.equal(false);
  });

  // it('valida service validate name service quando é valido', async () => {
  //   const response = await productsService.createProductService(productMock);
  //   const { name } = await productsService.validateNameService(productMock.name);
  //   // console.log(response);
  //   expect(name).to.be.equal(true);
  // });

  // it('verifica se quantidade é menor que 1', async () => {
  //   const quantity = await productsService.validateQuantityService(-1);
  //   expect(quantity).to.be.equal(false);
  // })

  it('valida a funcao de pegar pelo id', async () => {
    const response = await productsService.getByIdService('a');
    expect(response).to.be.null;
  })

  it('valida service validate name service', async () => {
    const { name } = await productsService.validateNameService('computeiro');
    // console.log(response);
    expect(name).to.be.equal(true);
  });

  it('teste da funcao validate quantity', async () => {
    const { name } = await productsService.validateNumberQuantityService('Nome');
    // console.log(response);
    expect(name).to.be.equal(false);
  })

  it('valida para deletar', async () => {
    const response = await productsService.deleteProductService(productMock._id);
  });

  it('todos os produtos', async () => {
    const response = await productsService.getAllService();
    expect(response).to.be.a('array');
  });

});

describe('Testa sales service', async () => {
  it('valida venda', async () => {
    const response = await salesService.registerSaleService(saleMock);
    const err = await salesService.registerSaleService('erro');
    expect(response).to.be.a('object');
    expect(response).to.have.property('_id');
    expect(response).to.have.property('itensSold');
  });

  it('todas as vendas', async () => {
    const response = await salesService.getAllService();
    expect(response).to.be.a('array');
  });

  it('valida para update', async () => {
    const response = await salesService.updateSaleService(saleMock);
    const err = await salesService.updateSaleService('erro');
    expect(response).to.be.a('object');
  });

  it('valida se quantidade é valida', async () => {
    const response = await salesService.validateQuantity(saleMock);
    expect(response).to.be.equal([]);
  });

  it('valida o tipo quantidade', async () => {
    const response = await salesService.validateQuantityType(saleMock[0].quantity);
    expect(response).to.be.a('array');
    
  });

  it('pegar todas as vendas pelo id', async () => {
    const response = await salesService.getByIdService(saleMock[0].id);
    expect(response).to.be.null;
  });

  it('valida se tem erro', async () => {
    const result = await salesService.registerSaleService(productMock);
    expect(result).to.be.an('error');
  })

  it('valida se tem erro', async () => {
    const { err } = await salesService.registerSaleService(productMock).catch((err) => err);
    expect(result).to.be.an('error');
  })

  it('valida para deletar', async () => {
    const response = await salesService.deleteSaleService(saleMock._id);
    expect(response).to.be.null;
  });
});

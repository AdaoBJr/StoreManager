// const { expect } = require('chai');
// const sinon = require('sinon');

// const serviceModel = require('../../services/productsService')
// const productsModel = require('../../models/productsModel')

// describe('Testa a função validateProduct do productService', () => {
//   before(() => {
//     sinon.stub(productsModel, 'findByName')
//       .resolves(true);
//   });

//   after(() => {
//     productsModel.findByName.restore();
//   });

//   it('Envia um nome com lenght menor que 5', async () => {
//     const response = await serviceModel.validateProduct('xab', '5')

//     expect(response).to.be.an('string');
//   })

//   it('Envia um número menor que 1', async () => {
//     const response = await serviceModel.validateProduct('xablauu', 0)

//     expect(response).to.be.an('string');
//   })

//   it('Envia um produto que já existe', async () => {
//     const response = await serviceModel.validateProduct('xablauu', 5)

//     expect(response).to.equal('Product already exists');
//   })
// })

// describe('Testa a função createNewProduct do productService', () => {
//   const product = {
//     name: "Produto",
//     quantity: 10,
//   }
//   before(() => {
//     sinon.stub(productsModel, 'create')
//     .resolves({
//       _id: 1,
//       name: product.name,
//       quantity: product.quantity,
//     });
//   });

//   after(() => {
//     productsModel.create.restore();
//   });

//   it('Retorna o produto criado com _id', async () => {
//     const response = await serviceModel.createNewProduct(product.name, product.quantity)

//     expect(response).to.have.a.property('_id')
//   })

// })

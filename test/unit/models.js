const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const sinon = require('sinon');
const {expect} = require('chai');
const {mongoClient, objectId} = require('mongodb');

const productTest = { name: "Produto Silva", quantity: 10 };


describe('Encontra um produto pelo nome', () => {
  it('retorna null quando não há produto cadastrado com o nome', () => {
    const response = productsModel.findProductByName(productTest);

    expect(response).toBe(null);
  })
})

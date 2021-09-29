const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController')
const productService = require('../../services/productsService')

console.log("carreguei o script");

describe('Verifica se retorna as informações corretas ao criar produto', () => {
  const res = {};
  const req = {};
  
  before(async () => {
    req.body = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  })

  console.log("Entrei no primeiro describe");

  it('Quando o payload é inválido', async () => {
    await productController.createNewProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true);
  })

})

describe('Quando o payload é válido', async () => {
	const newProduct = {
    _id: '604cb554311d68f491ba5781',
    name: "UmProduto",
    quantity: 100,
  }

  const res = {};
  const req = {};

  before(() => {
    req.body = {
      name: newProduct.name,
      quantity: newProduct.quantity
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'createNewProduct').resolves({ ...newProduct });
  });

  after(() => {
    productService.createNewProduct.restore();
  });

  console.log("Entrei no segundo describe");

  it('Quando o payload é válido', async () => {
    await productController.createNewProduct(req, res)

    expect(res.status.calledWith(201)).to.be.equal(true);
  })
})

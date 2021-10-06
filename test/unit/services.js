const sinon = require('sinon');
const { expect } = require('chai');

const Model = require('../../models');
const Service = require('../../services');
const ID_EXAMPLE = '604cb554311d68f491ba5781';
const NOT_VALID_ID = 'I am not valid';

describe('Cadastro de um novo produto', () => {
  describe('com dados válidos', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      sinon.stub(Model.products, 'storeProduct').resolves({ _id: ID_EXAMPLE, ...payload });
      sinon.stub(Model.products, 'getProductByName').resolves(false);
    });

    after(() => {
      Model.products.storeProduct.restore();
      Model.products.getProductByName.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response).to.have.property('_id');
    });
  });

  describe('com "name" curto demais', () => {
    const payload = { name: '', quantity: 30 };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('com uma string no campo "quantity"', () => {
    const payload = { name: 'Testy, the Tester', quantity: 'trinta' };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"quantity" must be a number');
    });
  });

  describe('com um numero menor que 1 no campo "quantity"', () => {
    const payload = { name: 'Testy, the Tester', quantity: 0 };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"quantity" must be larger than or equal to 1');
    });
  });

  describe('com um produto que já está cadastrado', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      sinon.stub(Model.products, 'getProductByName').resolves(true);
    });

    after(() => {
      Model.products.getProductByName.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.storeProduct(payload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Product already exists');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    before(() => {
      sinon.stub(Model.products, 'getAllProducts').resolves([]);
    });

    after(() => {
      Model.products.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await Model.products.getAllProducts();

      expect(response).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.products.getAllProducts();

      expect(response).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };
    before(() => {
      sinon.stub(Model.products, 'getAllProducts').resolves([payload]);
    });

    after(() => {
      Model.products.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await Model.products.getAllProducts();

      expect(response).to.be.an('array');
    });

    it('de objetos contendo as informações dos produtos', async () => {
      const response = await Model.products.getProducts();

      expect(response[0]).to.be.an('object');

      expect(response[0]).to.have.property('name');

      expect(response[0]).to.have.property('quantity');

      expect(response[0].name).to.be.equal(payload.name);

      expect(response[0].quantity).to.be.equal(payload.quantity);
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {

  describe('quando o "_id" passado é inválido', () => {
    it('retorna um objeto de erro', async () => {
      const response = await Service.products.getProductsById(NOT_VALID_ID);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.getProductsById(NOT_VALID_ID);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('quando não encontrado', () => {
    before(() => {
      sinon.stub(Model.products, 'getProductsById').resolves(null);
    });

    after(() => {
      Model.products.getProductsById.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.getProductsById(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.getProductsById(ID_EXAMPLE);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('quando encontrado', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };
    before(() => {
      sinon.stub(Model.products, 'getProductsById').resolves(payload);
    });

    after(() => {
      Model.products.getProductsById.restore();
    });

    it('o retorno é um objeto, com as informações do produto', async () => {
      const response = await Service.products.getProductsById(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');
      expect(response.name).to.be.equal(payload.name);

      expect(response.quantity).to.be.equal(payload.quantity);
    });
  });
});

describe('Atualiza as informações de um produto', () => {
  const updatedPayload = { name: 'Testy, the Tester', quantity: 45 };

  describe('quando o "_id" passado é inválido', () => {
    it('retorna um objeto de erro', async () => {
      const response = await Service.products.updatedProduct(NOT_VALID_ID, updatedPayload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.updatedProduct(NOT_VALID_ID, updatedPayload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('quando não encontrado', () => {
    before(() => {
      sinon.stub(Model.products, 'updatedProduct').resolves({ matchedCount: 0 });
    });

    after(() => {
      Model.products.updatedProduct.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('Wrong id format');
    });
  });

  describe('com "name" curto demais', () => {
    const updatedPayload = { name: '', quantity: 30 };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('com uma string no campo "quantity"', () => {
    const updatedPayload = { name: 'Testy, the Tester', quantity: 'trinta' };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"quantity" must be a number');
    });
  });

  describe('com um numero menor que 1 no campo "quantity"', () => {
    const updatedPayload = { name: 'Testy, the Tester', quantity: 0 };

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response.err.code).to.be.equal('invalid_data');

      expect(response.err.message).to.be.equal('"quantity" must be larger than or equal to 1');
    });
  });

  describe('quando encontrado, atualiza as informações', () => {
    before(() => {
      sinon.stub(Model.products, 'updatedProduct').resolves({ matchedCount: 1 });
    });

    after(() => {
      Model.products.updatedProduct.restore();
    });

    it('e retorna o produto atualizado', async () => {
      const response = await Service.products.updatedProduct(ID_EXAMPLE, updatedPayload);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');

      expect(response.name).to.be.equal(updatedPayload.name);

      expect(response.quantity).to.be.equal(updatedPayload.quantity);
    });
  });
});


describe('Deleta um produto cadastrado', () => {
  const payload = { _id: ID_EXAMPLE, name: 'Testy, the Tester', quantity: 30 };

  describe('quando o "_id" passado é inválido', () => {
    it('retorna um objeto de erro', async () => {
      const response = await Service.products.deleteProduct(NOT_VALID_ID);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.deleteProduct(NOT_VALID_ID);

      expect(response.err.code).to.be.equal(ERROR_CODE_400);

      expect(response.err.message).to.be.equal(ERROR_ID);
    });
  });

  describe('quando não encontrado', () => {
    before(() => {
      sinon.stub(Model.products, 'deleteProduct').resolves({ deletedCount: 0 });
      sinon.stub(Model.products, 'getProductsById').resolves(payload);
    });

    after(() => {
      Model.products.deleteProduct.restore();
      Model.products.getProductsById.restore();
    });

    it('retorna um objeto de erro', async () => {
      const response = await Service.products.deleteProduct(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response).to.have.property('err');
    });

    it('contendo a mensagem correta', async () => {
      const response = await Service.products.deleteProduct(ID_EXAMPLE);

      expect(response.err.code).to.be.equal(ERROR_CODE_400);

      expect(response.err.message).to.be.equal(ERROR_ID);
    });
  });

  describe('quando encontrado', () => {
    before(() => {
      sinon.stub(Model.products, 'deleteProduct').resolves({ deletedCount: 1 });
      sinon.stub(Model.products, 'getProductsById').resolves(payload);
    });

    after(() => {
      Model.products.deleteProduct.restore();
      Model.products.getProductsById.restore();
    });

    it('deleta o produto e retorna as suas informações', async () => {
      const response = await Service.products.deleteProduct(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');

      expect(response.name).to.be.equal(payload.name);

      expect(response.quantity).to.be.equal(payload.quantity);
    });
  });
});
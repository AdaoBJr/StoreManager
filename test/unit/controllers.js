const sinon = require('sinon');
const { expect } = require('chai');

const ProductsServices = require('../../services/index.js');
// {
  // registerProduct,
  // listAllProducts,
  // findProduct,
  // updateProduct,
  // deleteProduct,
  // registerSale,
  // listAllSales,
  // findSale,
  // updateSale,
  // deleteSale,
// } 

const ProductsControllers = require('../../controllers/productsControllers');
// const SalesControllers = require('../../controllers/salesControllers');

const PRODUTO_VALIDO = {
  name: 'A Varinha das Varinhas',
  quantity: 1,
}
// capa da invisibilidade, a pedra da ressurreição
// const VENDA_VALIDA = {
  // productId: resultProductId,
  // quantity: 1,
// }

describe('Testes: Camada Controllers - Products', () => {
  describe('Ao chamar o método REGISTER do controller productsControllers', () => {
    describe('Quando o payload informado NÃO é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();

        sinon.stub(ProductsServices, 'registerProduct').resolves(false);
      });

      after(() => { ProductsServices.registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
      });
    });

    describe('Quando o payload informado é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = PRODUTO_VALIDO;

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
      sinon.stub(registerProduct).resolves(true);
      })
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('???')).to.be.equal(true);
      });
    });
  });
  describe('Ao chamar o método LISTALL do controller productsControllers', () => {
    describe('Quando o payload informado NÃO é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
        sinon.stub('registerProduct').resolves(false);
      });
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
      });
    });

    describe('Quando o payload informado é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = PRODUTO_VALIDO;

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
      sinon.stub(registerProduct).resolves(true);
      })
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('???')).to.be.equal(true);
      });
    });
  });
  describe('Ao chamar o método FIND do controller productsControllers', () => {
    describe('Quando o payload informado NÃO é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
        sinon.stub('registerProduct').resolves(false);
      });
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
      });
    });

    describe('Quando o payload informado é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = PRODUTO_VALIDO;

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
      sinon.stub(registerProduct).resolves(true);
      })
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('???')).to.be.equal(true);
      });
    });
  });
  describe('Ao chamar o método DELETE do controller productsControllers', () => {
    describe('Quando o payload informado NÃO é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
        sinon.stub('registerProduct').resolves(false);
      });
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
      });
    });

    describe('Quando o payload informado é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = PRODUTO_VALIDO;

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
  
      sinon.stub(registerProduct).resolves(true);
      })
  
      after(() => { registerProduct.restore() });

      it('Retornar o código de status xxx - aaaaa', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Retornar a mensagem: ', async () => {
        await ProductsControllers.registerProductController(request, response);
        expect(response.send.calledWith('???')).to.be.equal(true);
      });
    });
  });
});

// describe('Testes: Camada Controllers - Sales', () => {
// });

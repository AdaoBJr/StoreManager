const sinon = require('sinon');
const { expect } = require('chai');

const productServices = require('../../services/Products');
const salesService = require('../../services/Sales');
const productControllers = require('../../controllers/Products');
const salesControllers = require('../../controllers/Sales');

const mwError = require('../../middlewares/error');

describe('Controllers de Products', () => {
  describe('testa o controller "getAll"', () => {
    describe('quando a função é executada com sucesso', () => {
      const response = {};
      const request = {};
      const productsMock = {
        products: [
          {
            _id: '614160ab109145ec555b8425',
            name: 'Playstation 5',
            quantity: 960,
          },
        ],
      };
      describe('a resposta', () => {
        beforeEach(() => {
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();

          sinon.stub(productServices, 'getAll').resolves(productsMock);
        });

        afterEach(() => {
          productServices.getAll.restore();
        });

        it('tem status 200', async () => {
          await productControllers.getAll(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um json com os produtos cadastrados', async () => {
          await productControllers.getAll(request, response);
          expect(response.json.calledWith(productsMock)).to.be.equal(true);
        });
      });
    })
  });

  describe('testa o controller "getById"', () => {
    describe('quando a funcao retorna com sucesso', () => {
      const response = {};
      const request = { params: { id: '614160ab109145ec555b8425' } };
      const productsMock = {
        _id: '614160ab109145ec555b8425',
        name: 'Playstation 5',
        quantity: 960,
      };

      describe('a resposta', () => {
        beforeEach(() => {
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(productServices, 'getById').resolves(productsMock);
        });

        afterEach(() => {
          productServices.getById.restore();
        });

        it('deve haver o parametro ID', async () => {
          await productControllers.getById(request, response);
          expect(request.params).to.have.property('id');
        });

        it('retorna o status 200', async () => {
          await productControllers.getById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna o json com o produto', async () => {
          await productControllers.getById(request, response);
          expect(response.json.calledWith(productsMock)).to.be.equal(true);
        });

      });
    });

    describe('quando ID inválido ou não encontrado', () => {
      const response = {};
      const request = { params: { id: '61416' } };
      const error = new Error();
      error.statusCode = 'invalidIdFormat';
      let next;
      describe('a resposta', () => {
        beforeEach(() => {
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns(response);
          next = sinon.stub().returns();
          sinon.stub(productServices, 'getById').throws(error);
        });

        afterEach(() => {
          productServices.getById.restore();
        });

        it('retorna o status 422', async () => {
          await mwError(error, request, response, next)
          expect(response.status.calledWith(422)).to.be.equal(true);
        });
      })
    });
  });

  describe('testa o controller "createProduct"', () => {
    describe('quando a função retorna com sucesso', () => {
      const response = {};
      const request = { params: { id: '614160ab109145ec555b8425' } };

      const productMock = {
        _id: "61418aa32e836090602e61a3",
        name: "Pipoca",
        quantity: 13
      }

      describe('a resposta', () => {
        beforeEach(() => {
          request.body = {
            name: 'Pipoca',
            quantity: 13,
          };

          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(productServices, 'createProduct').resolves(productMock);
        });

        afterEach(() => {
          productServices.createProduct.restore();
        });

        it('retorna o status 201', async () => {
          await productControllers.createProduct(request, response);
          expect(response.status.calledWith(201)).to.be.equal(true);
        });

        it('retorna o json com o produto cadastrado', async () => {
          await productControllers.createProduct(request, response);
          expect(response.json.calledWith(productMock)).to.be.equal(true);
        });

        it('oQueDeveFazer', async () => {
          await productControllers.createProduct(request, response);
          expect(request.body).to.have.all.keys('name', 'quantity');
        });
      });
    });
  });

  describe('Testes do controller "updateProduct', () => {
    describe('quando a função retorna com sucesso', () => {
      const response = {};
      const request = {};
      const productMock = {
        _id: "61418aa32e836090602e61a3",
        name: "Pipoca",
        quantity: 13
      };

      describe('a resposta', () => {
        beforeEach(() => {
          request.body = {
            name: 'Pipoca',
            quantity: 13,
          };
          request.params = { id: "61418aa32e836090602e61a3" }
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(productServices, 'updateProduct').resolves(productMock);
        });

        afterEach(() => {
          productServices.updateProduct.restore();
        });

        it('retorna o status 200', async () => {
          await productControllers.updateProduct(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um json com o produto atualizado', async () => {
          await productControllers.updateProduct(request, response);
          expect(response.json.calledWith(productMock)).to.be.equal(true);
        });

        it('o body deve conter as chaves "name" e "quantity"', async () => {
          await productControllers.updateProduct(request, response);
          expect(request.body).to.have.all.keys('name', 'quantity');
        });

        it('o params deve conter a chave "id"', async () => {
          await productControllers.updateProduct(request, response);
          expect(request.params).to.have.property('id');
        });
      });
    });
  });

  describe('Testes do controller "deleteProduct', () => {
    describe('quando a função retorna com sucesso', () => {
      const response = {};
      const request = {};
      const productMock = {
        _id: "61418aa32e836090602e61a3",
        name: "Pipoca",
        quantity: 13
      };

      describe('a resposta', () => {
        beforeEach(() => {
          request.body = {
            name: 'Pipoca',
            quantity: 13,
          };
          request.params = { id: "61418aa32e836090602e61a3" }
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(productServices, 'deleteProduct').resolves(productMock);
        });

        afterEach(() => {
          productServices.deleteProduct.restore();
        });

        it('retorna o status 200', async () => {
          await productControllers.deleteProduct(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um json com o produto deletado', async () => {
          await productControllers.deleteProduct(request, response);
          expect(response.json.calledWith(productMock)).to.be.equal(true);
        });

        it('o body deve conter as chaves "name", "_id" e "quantity"', async () => {
          await productControllers.deleteProduct(request, response);
          expect(request.body).to.have.all.keys('name', 'quantity');
        });

        it('o params deve conter a chave "id"', async () => {
          await productControllers.deleteProduct(request, response);
          expect(request.params).to.have.property('id');
        });
      });
    });
  });
});

describe('Controllers de Sales', () => {
  describe('testa o controller "getAll"', () => {
    describe('quando a função é executada com sucesso', () => {
      const response = {};
      const request = {};
      const salesMock = {
        sales: [
          {
            _id: '614160b4109145ec555b8426',
            itensSold: [
              {
                productId: '6140fd5080d16d1aed89az',
                quantity: 100,
              },
            ],
          },
        ],
      }
      describe('a resposta', () => {
        beforeEach(() => {
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();

          sinon.stub(salesService, 'getAll').resolves(salesMock);
        });

        afterEach(() => {
          salesService.getAll.restore();
        });

        it('tem status 200', async () => {
          await salesControllers.getAll(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um json com os produtos cadastrados', async () => {
          await salesControllers.getAll(request, response);
          expect(response.json.calledWith(salesMock)).to.be.equal(true);
        });
      });
    })
  });

  describe('testa o controller "getById"', () => {
    describe('quando a funcao retorna com sucesso', () => {
      const response = {};
      const request = { params: { id: '614160ab109145ec555b8425' } };
      const salesMock = {
        _id: '614160ab109145ec555b8425',
        itensSold: [
          {
            productId: '6140fd5080d16d1aed89az',
            quantity: 100,
          },
        ],
      };

      describe('a resposta', () => {
        beforeEach(() => {
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(salesService, 'getById').resolves(salesMock);
        });

        afterEach(() => {
          salesService.getById.restore();
        });

        it('deve haver o parametro ID', async () => {
          await salesService.getById(request, response);
          expect(request.params).to.have.property('id');
        });

        it('retorna o status 200', async () => {
          await salesControllers.getById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna o json com a venda', async () => {
          await salesControllers.getById(request, response);
          expect(response.json.calledWith(salesMock)).to.be.equal(true);
        });
      });
    });
  });

  describe('testa o controller "newSale"', () => {
    describe('quando a função retorna com sucesso', () => {
      const response = {};
      const request = {};

      const newSaleMockResponse = {
        itensSold: [
          {
            productId: '614177c3759bd24939c2059b',
            quantity: 10,
          },
        ],
        _id: '6142208b1061d89ea8cab05b',
      };

      describe('a resposta', () => {
        beforeEach(() => {
          request.body = [
            {
              productId: '614177c3759bd24939c2059b',
              quantity: 10,
            },
          ];

          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(salesService, 'newSale').resolves(newSaleMockResponse);
        });

        afterEach(() => {
          salesService.newSale.restore();
        });

        it('retorna o status 200', async () => {
          await salesControllers.newSale(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna o json com a venda cadastrada', async () => {
          await salesControllers.newSale(request, response);
          expect(response.json.calledWith(newSaleMockResponse)).to.be.equal(true);
        });
      });
    });
  });

  describe('Testes do controller "updateSale', () => {
    describe('quando a função retorna com sucesso', () => {
      const response = {};
      const request = {};
      const updateMockResponse = {
        _id: '614222e61b9b0fa943983c70',
        itensSold: [
          {
            productId: '614222d61b9b0fa943983c6f',
            quantity: 10,
          },
        ],
      };

      describe('a resposta', () => {
        beforeEach(() => {
          request.body = [
            {
              productId: '614177c3759bd24939c2059b',
              quantity: 10,
            },
          ];

          request.params = { id: "614222e61b9b0fa943983c70" }
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(salesService, 'updateSale').resolves(updateMockResponse);
        });

        afterEach(() => {
          salesService.updateSale.restore();
        });

        it('retorna o status 200', async () => {
          await salesControllers.updateSale(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um json com o produto atualizadp', async () => {
          await salesControllers.updateSale(request, response);
          expect(response.json.calledWith(updateMockResponse)).to.be.equal(true);
        });

        it('o body deve conter as chaves "productId" e "quantity"', async () => {
          await salesControllers.updateSale(request, response);
          expect(request.body[0]).to.have.all.keys('productId', 'quantity');
        });

        it('o params deve conter a chave "id"', async () => {
          await salesControllers.updateSale(request, response);
          expect(request.params).to.have.property('id');
        });
      });
    });
  });

  describe('Testes do controller "deleteSale', () => {
    describe('quando a função retorna com sucesso', () => {
      const response = {};
      const request = {};
      const deleteMockResponse = {
        _id: '614222e61b9b0fa943983c70',
        itensSold: [
          {
            productId: '614222d61b9b0fa943983c6f',
            quantity: 10,
          },
        ],
      };

      describe('a resposta', () => {
        beforeEach(() => {
          request.params = { id: "61418aa32e836090602e61a3" }
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();
          sinon.stub(salesService, 'deleteSale').resolves(deleteMockResponse);
        });

        afterEach(() => {
          salesService.deleteSale.restore();
        });

        it('retorna o status 200', async () => {
          await salesControllers.deleteSale(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um json com a venda deletada', async () => {
          await salesControllers.deleteSale(request, response);
          expect(response.json.calledWith(deleteMockResponse)).to.be.equal(true);
        });

        it('o params deve conter a chave "id"', async () => {
          await salesControllers.deleteSale(request, response);
          expect(request.params).to.have.property('id');
        });
      });
    });
  });
});

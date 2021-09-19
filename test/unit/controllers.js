const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productServices');

const salesController = require('../../controllers/salesController');
const salesService = require('../../controllers/salesController');

describe('Testa o Products Controller', () => {
  describe('Ao chamar o Controller de create', () => {
    describe('quando o payload não é válido', () => {
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.body = {};

        response.status = sinon.stub()
          .returns({
            status: 400
          });
        response.json = sinon.stub()
          .returns({ err: { code: 'invalid_data' } });

        sinon.stub(productsService, 'create')
          .resolves(false);
      });

      after(() => {
        productsService.create.restore();
      });

      it('é chamado o status com o código 400', async () => {
        await productsController.create(request, response, next);
  
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com o code "invalid_data"', async () => {
        await productsController.create(request, response, next);
  
        expect(response.json.calledWith({ err: { code: 'invalid_data' } })).to.be.equal(true);
      });
    });

    describe('quando o produto já existe', () => {
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.body = {
          name: 'Produto',
          quantity: 5,
        };

        response.status = sinon.stub()
          .returns(422);

        response.json = sinon.stub()
          .returns({
            err: { code: 'invalid_data', message: 'Product already exists' },
          });

        sinon.stub(productsService, 'create')
          .resolves(false);
      });

      after(() => {
        productsService.create.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await productsController.create(request, response, next);
  
        expect(response.status.calledWith(422)).to.be.equal(true);
      });
    });

    describe('quando o payload é válido', () => {
      describe('quando é inserido com sucesso', () => {
        const response = {};
        const request = {};
        const next = () => {};
    
        before(() => {
          request.body = {
            name: 'Produto',
            quantity: 5,
          };
    
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();

          sinon.stub(productsService, 'create')
            .resolves(true);
        });

        after(() => {
          productsService.create.restore();
        });

        it('é chamado o status com o código 201', async () => {
          await productsController.create(request, response, next);
    
          expect(response.status.calledWith(201)).to.be.equal(true);
        });
      });
    });
  });

  describe('Ao chamar o Controller getAll', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      response.body = [
        {
          name: 'Produto',
          quantity: 10
        }
      ];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getAll')
          .resolves(true);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('recebe todos os produtos', async () => {
      await productsController.getAll(request, response, next);

      expect(response.status.calledWith(201).to.be.equal(true));
    });
  });

  describe('Ao chamar o Controller getById', () => {
    describe('quando o payload não é válido', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'getById')
            .resolves(false);
      });

      after(() => {
        productsService.getById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await productsController.getById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });

    describe('quando o produto não existe', () => {
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        };

        response.err = {
          code: 'invalid_data',
          message: 'Wrong id format',
        };

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'getById')
            .resolves(false);
      });

      after(() => {
        productsService.getById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await productsController.getById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });

    describe('quando o produto existe', () => {
      const response = {
        _id: '0a2146448s945115',
        name: 'Produto',
        quantity: 15,
      }
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'updateById')
            .resolves(true);
      });

      after(() => {
        productsService.updateById.restore();
      });

      it('retorna o status 200', async() => {
        await productsController.updateById(request, response, next);

        expect(response.status.calledWith(201).to.be.equal(true));
      })

    });
  });

  describe('Ao chamar o Controller updateById', () => {
    describe('quando o payload não é válido', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Product doesn\'t exist',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'updateById')
            .resolves(false);
      });

      after(() => {
        productsService.updateById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await productsController.updateById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });

    describe('quando o payload está com parâmetro incorreto', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Product doesn\'t exist',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'updateById')
            .resolves(false);
      });

      after(() => {
        productsService.updateById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await productsController.updateById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });

    describe('quando o payload é válido', () => {
      const response = {
        status: 200,
        _id: '0a2146448',
        name: 'Novo Produto',
        quantity: 15
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448',
        }

        request.body = {
          name: 'Novo Produto',
          quantity: 15,
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'updateById')
            .resolves(true);
      });

      after(() => {
        productsService.updateById.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await productsController.updateById(request, response, next);

        expect(response.status.calledWith(200).to.be.equal(true));
      })
    });
  });

  describe('Ao chamar o Controller deleteById', () => {
    describe('quando o payload não é válido', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Product doesn\'t exist',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'deleteById')
            .resolves(false);
      });

      after(() => {
        productsService.deleteById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await productsController.deleteById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });

    describe('quando o payload é válido', () => {
      const response = {
        _id: '614739df92c3c0a0570d37f7',
        name: 'Produto',
        quantity: 10
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '614739df92c3c0a0570d37f7',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(productsService, 'deleteById')
            .resolves(true);
      });

      after(() => {
        productsService.deleteById.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await productsController.deleteById(request, response, next);

        expect(response.status.calledWith(200).to.be.equal(true));
      })
    });
  });
});

describe('Testa o Sales Controller', () => {
  describe('Ao chamar o Controller de create', () => {
    describe('quando o payload não é válido', () => {
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.body = {};
        response.err = {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        };

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(salesService, 'create')
          .resolves(false);
      });

      after(() => {
        salesService.create.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await salesController.create(request, response, next);
  
        expect(response.status.calledWith(422)).to.be.equal(true);
      });

      it('é chamado o json com o code "invalid_data"', async () => {
        await salesController.create(request, response, next);
  
        expect(response.json.calledWith({ err: { code: 'invalid_data' } })).to.be.equal(true);
      });
    });

    describe('quando o produto já existe', () => {
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.body = {
          name: 'Produto',
          quantity: 5,
        };

        response.status = sinon.stub()
          .returns(422);

        response.json = sinon.stub()
          .returns({
            err: { code: 'invalid_data', message: 'Product already exists' },
          });

        sinon.stub(salesService, 'create')
          .resolves(false);
      });

      after(() => {
        salesService.create.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await salesController.create(request, response, next);
  
        expect(response.status.calledWith(422)).to.be.equal(true);
      });
    });

    describe('quando o payload é válido', () => {
      describe('quando é inserido com sucesso', () => {
        const response = {};
        const request = {};
        const next = () => {};
    
        before(() => {
          request.body = {
            name: 'Produto',
            quantity: 5,
          };
    
          response.status = sinon.stub()
            .returns(response);
          response.json = sinon.stub()
            .returns();

          sinon.stub(salesService, 'create')
            .resolves(true);
        });

        after(() => {
          salesService.create.restore();
        });

        it('é chamado o status com o código 201', async () => {
          await salesController.create(request, response, next);
    
          expect(response.status.calledWith(201)).to.be.equal(true);
        });
      });
    });
  });

  describe('Ao chamar o Controller getAll', () => {
    const response = {};
    const request = {};
    const next = () => {};

    before(() => {
      response.body = [
        {
          name: 'Produto',
          quantity: 10
        }
      ];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);

      sinon.stub(salesService, 'getAll')
          .resolves(true);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('recebe todos os produtos', async () => {
      await salesController.getAll(request, response, next);

      expect(response.status.calledWith(201).to.be.equal(true));
    });
  });

  describe('Ao chamar o Controller getById', () => {
    describe('quando o payload não é válido', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(salesService, 'getById')
            .resolves(false);
      });

      after(() => {
        salesService.getById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await salesController.getById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });
  });

  describe('Ao chamar o Controller updateById', () => {
    describe('quando o payload não é válido', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Product doesn\'t exist',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(salesService, 'update')
            .resolves(false);
      });

      after(() => {
        salesService.update.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await salesController.update(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });
  });

  describe('Ao chamar o Controller deleteById', () => {
    describe('quando o payload não é válido', () => {
      const response = {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Product doesn\'t exist',
        },
      };
      const request = {};
      const next = () => {};

      before(() => {
        request.params = {
          id: '0a2146448s945115',
        }

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns(response);

        sinon.stub(salesService, 'deleteById')
            .resolves(false);
      });

      after(() => {
        salesService.deleteById.restore();
      });

      it('é chamado o status com o código 422', async () => {
        await salesController.deleteById(request, response, next);

        expect(response.status.calledWith(422).to.be.equal(true));
      })
    });
  });
});
const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const ERR_ID = {
  err: { code: 'invalid_data', message: 'Wrong id format' },
};
const ERR_LENGTH_NAME = {
  err:{code:'invalid_data', message: '"name" length must be at least 5 characters long'}
};
const ERR_QUANTITY = {
  err:{code:'invalid_data', message: '"quantity" must be larger than or equal to 1'}
};
const ERR_TYPE_QUANTITY = {
  err:{code:'invalid_data', message: '"quantity" must be a number'}
};
const ERR_NAME_EXISTS = {
  err:{code:'invalid_data', message: 'Product already exists'}
};

const ERR_QUANTITY_SALE = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
};

const ERR_NOT_FOUND_SALE = {
  err: { code: 'not_found', message: 'Sale not found' },
};

const ERR_ID_SALE = {
  err: { code: 'invalid_data', message: 'Wrong sale ID format' },
};

const ERR_STOCK_SALE = {
  err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
};

const ProductModel = require('../../models/ProductModels');
const ProductService = require('../../services/ProductService');
const SaleModel = require('../../models/SaleModel');
const SaleService = require('../../services/SaleService');

describe('Services - Validações para a rota "/products"', () => {
  const id = ObjectId('604cb554311d68f491ba5781');

  describe('Listar todos os produtos', () => {
    before(() => {
      const products =  {
        _id: id,
        name: "Produto teste",
        quantity: 1,
      }
      sinon.stub(ProductModel, 'getAll')
        .resolves({ products: [products] });
    });

    after(() => {
      ProductModel.getAll.restore();
    })

    it('Verifica se retorna um objeto', async () => {
      const response = await ProductService.getAllProduct();
      expect(response).to.be.an('object');
    });

    it('Verifica se a lista de produtos é um array', async () => {
      const response = await ProductService.getAllProduct();
      expect(response.products).to.be.an('array');
    });

    it('Verifica se retorna todos os produtos', async () => {
      const response = await ProductService.getAllProduct()
      expect(response.products[0]).to.be.includes.keys('_id', 'name', 'quantity');
    });
  });

  describe('Buscar um produto por ID', () => {
    describe('Quando não existe produto cadastrado', () => {
      before(() => {
        sinon.stub(ProductModel, 'findById')
        .resolves(false);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it('Quando não existe o produto cadastrado', async () => {
        const response = await ProductService.getProductById(id);
        console.log(response)
        expect(response).to.deep.equals(ERR_ID);
      });
    });

    describe('Quando existe produto cadastrado', async () => {
      const products =  {
        _id: id,
        name: "Produto teste",
        quantity: 1,
      }
      before(() => {
        sinon.stub(ProductModel, 'findById')
        .resolves(products);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it('Verifica se retorna um objeto', async () => {
        const response = await ProductService.getProductById(id);
        expect(response).to.be.an('object');
      });

      it('Verfica se retorna um determinado produto pelo ID', async () => {
        const response = await ProductService.getProductById(id);
        expect(response).to.deep.equals(products);
      })
    });
  });

  describe('Criar um produto', () => {
    describe('Verifica que é possivel adicionar um novo produto com sucesso', () => {
      const products =  {
        _id: id,
        name: "Produto",
        quantity: 1,
      }
      before(() => {
        sinon.stub(ProductModel, 'create')
        .resolves(products);
      });

      after(() => {
        ProductModel.create.restore();
      });

      it('Verifica se é retornado o produto inserido', async () => {
        const { name, quantity } = products;
        const response = await ProductService.insert(name, quantity)
        console.log(response)
        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });
    describe('Verifica que não é possivel inserir um produto', () => {
      it('Verfica que retorna erro ao tentar inserir um produto com menos de cinco caracteres', async () => {
        const products =  {
          name: "Pf",
          quantity: 1,
        }

        const { name, quantity } = products;
        const response = await ProductService.insert(name, quantity)
        expect(response).to.deep.equals(ERR_LENGTH_NAME);
      });

      describe('Verfica a propriedade "quantity"', () => {
        it('Verfica que retorna erro ao tentar inserir um produto com quantidade menor que zero ', async () => {
          const products =  {
            name: "Produto teste",
            quantity: -1,
          }

          const { name, quantity } = products;
          const response = await ProductService.insert(name, quantity)
          expect(response).to.deep.equals(ERR_QUANTITY);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade igual a zero ', async () => {
          const products =  {
            name: "Produto teste",
            quantity: 0,
          }

          const { name, quantity } = products;
          const response = await ProductService.insert(name, quantity)
          expect(response).to.deep.equals(ERR_QUANTITY);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade não é um numero', async () => {
          const products =  {
            name: "Produto teste",
            quantity: "1",
          }

          const { name, quantity } = products;
          const response = await ProductService.insert(name, quantity)
          expect(response).to.deep.equals(ERR_TYPE_QUANTITY);
        });

      });

      describe('Verfica se existe um produto com mesmo nome cadastrado', () => {
        before(() => {
          sinon.stub(ProductModel, 'findByName')
          .resolves(true);
        });
        after(() => {
          ProductModel.findByName.restore();
        });
        it('Verifica que retorna um erro ao cadastrar um produto com um nome já cadastrado', async () => {
          const product = {
            name: "Produto teste",
            quantity: 1,
          }
          const response = await ProductService.insert(product.name, product.quantity)
          expect(response).to.deep.equals(ERR_NAME_EXISTS)
        })
      })

    })
  });

  describe('Atualizar um produto', () => {
    describe('Verifica que não é possivel inserir um produto', () => {
      it('Verfica que retorna erro ao tentar inserir um produto com menos de cinco caracteres', async () => {
        const products =  {
          _id: id,
          name: "Pf",
          quantity: 1,
        }

        const { _id, name, quantity } = products;
        const response = await ProductService.updateProduct(_id, {name, quantity})
        expect(response).to.deep.equals(ERR_LENGTH_NAME);
      });

      describe('Verfica a propriedade "quantity"', () => {
        it('Verfica que retorna erro ao tentar inserir um produto com quantidade menor que zero ', async () => {
          const products =  {
            _id: id,
            name: "Produto teste",
            quantity: -1,
          }
          const { _id, name, quantity } = products;
          const response = await ProductService.updateProduct(_id, { name, quantity })
          expect(response).to.deep.equals(ERR_QUANTITY);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade igual a zero ', async () => {
          const products =  {
            _id: id,
            name: "Produto teste 2",
            quantity: 0,
          }
          const { _id, name, quantity } = products;
          const response = await ProductService.updateProduct(_id, { name, quantity })
          expect(response).to.deep.equals(ERR_QUANTITY);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade não é um numero', async () => {
          const products =  {
            _id: id,
            name: "Produto teste 45",
            quantity: "1",
          }

          const { _id, name, quantity } = products;
          const response = await ProductService.updateProduct(_id, { name, quantity })
          expect(response).to.deep.equals(ERR_TYPE_QUANTITY);
        });

      });

      describe('Verfica se existe um produto com mesmo nome cadastrado', () => {
        before(() => {
          sinon.stub(ProductModel, 'findByName')
          .resolves(true);
        });
        after(() => {
          ProductModel.findByName.restore();
        });
        it('Verifica que retorna um erro ao cadastrar um produto com um nome já cadastrado', async () => {
          const product = {
            _id: id,
            name: "Produto teste",
            quantity: 1,
          }
          const { _id, name, quantity } = product;
          const response = await ProductService.updateProduct(_id, { name, quantity })
          expect(response).to.deep.equals(ERR_NAME_EXISTS)
        });
      });
    });
  });

  describe('Deletar um produto', () => {
    describe('Verfica se existe o produto cadastrado', () => {
      before(() => {
        sinon.stub(ProductModel, 'findById')
        .resolves(false);
      });

      after(() => {
        ProductModel.findById.restore();
      });

      it('Quando não existe o produto cadastrado', async () => {
        const response = await ProductService.deleteProduct(id);
        expect(response).to.deep.equals(ERR_ID);
      });
    });
    describe('Verifica se o produto deletado é retornado', () => {
      const product = {
        _id: id,
        name: 'Produto teste',
        quantity: 1
      }
      before(() => {
        sinon.stub(ProductModel, 'findById').resolves(true);
        sinon.stub(ProductModel, 'exclude').resolves(product);
      });

      after(() => {
        ProductModel.findById.restore();
        ProductModel.exclude.restore();
      });

      it('Quando não existe o produto cadastrado', async () => {
        const response = await ProductService.deleteProduct(id);
        expect(response).to.deep.equals(product);
      });
    })
  });
});

describe('Services - Validações para a rota "/sales"', () => {
  const id = ObjectId('604cb554311d68f491ba5781');
  const saleId = ObjectId("5f43cbf4c45ff5104986e81d");

  describe('Listar todos as vendas', () => {
    before(() => {
      const sale =  {
        _id: saleId,
        itensSold: [
          {
            productId: id,
            quantity: 1,
          }
        ]
      }
      sinon.stub(SaleModel, 'getAll')
        .resolves({ sales: [sale] });
    });

    after(() => {
      SaleModel.getAll.restore();
    })

    it('Verifica se retorna um objeto', async () => {
      const response = await SaleService.getAllProduct();
      expect(response).to.be.an('object');
    });

    it('Verifica se a lista de produtos é um array', async () => {
      const response = await SaleService.getAllProduct();
      expect(response.sales).to.be.an('array');
    });

    it('Verifica se retorna todos os produtos', async () => {
      const response = await SaleService.getAllProduct()
      expect(response.sales[0]).to.be.includes.keys('_id', 'itensSold');
    });
  });

  describe('Buscar uma venda por ID', () => {
    describe('Quando não existe produto cadastrado', () => {
      before(() => {
        sinon.stub(SaleModel, 'findById')
        .resolves(false);
      });

      after(() => {
        SaleModel.findById.restore();
      });

      it('Quando não existe o produto cadastrado', async () => {
        const response = await SaleService.getProductById(id);
        console.log(response)
        expect(response).to.deep.equals(ERR_NOT_FOUND_SALE);
      });
    });

    describe('Quando existe produto cadastrado', async () => {
      const sale =  {
        _id: saleId,
        itensSold: [
          {
            productId: id,
            quantity: 1,
          }
        ]
      }
      before(() => {
        sinon.stub(SaleModel, 'findById')
        .resolves(sale);
      });

      after(() => {
        SaleModel.findById.restore();
      });

      it('Verifica se retorna um objeto', async () => {
        const response = await SaleService.getProductById(saleId);
        expect(response).to.be.an('object');
      });

      it('Verfica se retorna um determinado produto pelo ID', async () => {
        const response = await SaleService.getProductById(saleId);
        expect(response).to.deep.equals(sale);
      })
    });
  });

  describe('Criar uma venda', () => {
    describe('Verifica que é possivel adicionar uma nova venda com sucesso', () => {
      const sale = [
        {
          productId: id,
          quantity: 3,
        }
      ]
      const product = {
        _id: id,
        name: 'Produto teste',
        quantity: 5
      }
      const saleCreated = {
        _id: saleId,
        itensSold: [
          {
            productId: id,
            quantity: 3,
          }
        ]
      }
      before(() => {
        sinon.stub(ProductModel, 'findById')
        .resolves(product);
        sinon.stub(SaleModel, 'create')
        .resolves(saleCreated);
      });

      after(() => {
        ProductModel.findById.restore();
        SaleModel.create.restore();
      });

      it('Verifica se é retornado o produto inserido', async () => {
        const response = await SaleService.insert(sale);
        expect(response).to.include.all.keys('_id', 'itensSold');
      });
    });
    describe('Verifica que não é possivel inserir uma venda', () => {
      describe('Verfica a propriedade "quantity"', () => {
        it('Verfica que retorna erro ao tentar inserir um produto com quantidade menor que zero ', async () => {
          const salesinfo = [
            {
              productId: id,
              quantity: -1,
            },
          ]
          const response = await SaleService.insert(salesinfo)
          expect(response).to.deep.equals(ERR_QUANTITY_SALE);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade igual a zero ', async () => {
          const salesinfo = [
            {
              productId: id,
              quantity: 0,
            },
          ]
          const response = await SaleService.insert(salesinfo)
          expect(response).to.deep.equals(ERR_QUANTITY_SALE);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade não é um numero', async () => {
          const salesinfo = [
            {
              productId: id,
              quantity: "1",
            },
          ]
          const response = await SaleService.insert(salesinfo)
          expect(response).to.deep.equals(ERR_QUANTITY_SALE);
        });
      });
      describe('Verifica se existe um produto', () => {
        const sale = [
          {
            productId: id,
            quantity: 1,
          }
        ]
        before(() => {
          sinon.stub(ProductModel, 'findById')
          .resolves(false);
        });

        after(() => {
          ProductModel.findById.restore();
        });
        it('Não existe produto cadastrado', async () => {
          const response = await SaleService.insert(sale);
          expect(response).to.deep.equals(ERR_STOCK_SALE)
        })
      });
      describe('O Produto tem uma quantidade inferior à da venda', () => {
        const sale = [
          {
            productId: id,
            quantity: 3,
          }
        ]
        const product = {
          _id: id,
          name: 'Produto teste',
          quantity: 2
        }

        before(() => {
          sinon.stub(ProductModel, 'findById')
          .resolves(product);
        });

        after(() => {
          ProductModel.findById.restore();
        });

        it('Quantitdade do produto é menor de a quantidade da venda', async () => {
          const response = await SaleService.insert(sale);
          expect(response).to.deep.equals(ERR_STOCK_SALE)
        })

      })
    });

  });

  describe('Atualizar um produto', () => {
    describe('Verifica que não é possivel inserir um produto', () => {
      describe('Verfica a propriedade "quantity"', () => {
        it('Verfica que retorna erro ao tentar inserir um produto com quantidade menor que zero ', async () => {
          const salesinfo = [
            {
              productId: id,
              quantity: -1,
            },
          ]
          const response = await SaleService.updateProduct(saleId, salesinfo)
          expect(response).to.deep.equals(ERR_QUANTITY_SALE);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade igual a zero ', async () => {
          const salesinfo = [
            {
              productId: id,
              quantity: 0,
            },
          ]
          const response = await SaleService.updateProduct(saleId, salesinfo)
          expect(response).to.deep.equals(ERR_QUANTITY_SALE);
        });

        it('Verfica que retorna erro ao tentar inserir um produto com quantidade não é um numero', async () => {
          const salesinfo = [
            {
              productId: id,
              quantity: "1",
            },
          ]
          const response = await SaleService.updateProduct(saleId, salesinfo)
          expect(response).to.deep.equals(ERR_QUANTITY_SALE);
        });
      });
    });
  });

  describe('Deletar um produto', () => {
    describe('Verfica se existe o produto cadastrado', () => {
      before(() => {
        sinon.stub(SaleModel, 'findById')
        .resolves(false);
      });

      after(() => {
        SaleModel.findById.restore();
      });

      it('Quando não existe o produto cadastrado', async () => {
        const response = await SaleService.deleteProduct(saleId);
        expect(response).to.deep.equals(ERR_ID_SALE);
      });
    });
    describe('Verifica se o produto deletado é retornado', () => {
      const product = {
        _id: id,
        name: 'Produto teste',
        quantity: 5
      }
      const saleCreated = {
        _id: saleId,
        itensSold: [
          {
            productId: id,
            quantity: 3,
          }
        ]
      }
      before(() => {
        sinon.stub(ProductModel, 'findById')
        .resolves(product);
        sinon.stub(SaleModel, 'exclude')
        .resolves(saleCreated);
      });

      after(() => {
        ProductModel.findById.restore();
        SaleModel.exclude.restore();
      });

      it('Verifica se é retornado o produto inserido', async () => {
        const response = await SaleService.deleteProduct(saleId);
        expect(response).to.include.all.keys('_id', 'itensSold');
      });
    });
  });
});


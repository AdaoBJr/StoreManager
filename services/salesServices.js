// const HTTP_OK_STATUS = 201;
// const HTTP_OK_DUZENTOS = 200;
const HTTP_ERR_FALSE = 422;
const HTTP_ERR_404 = 404;

const erroMensage = (message) => ({
    err: {
      code: 'invalid_data',
      message,
    },
  });

  const erroMensageSales = (message) => ({
    err: {
      code: 'not_found',
      message,
    },
  });

const salesWithAllProductValid = (req, res, next) => {
    const allProductSales = req.body;
    const erroProductName = 'Wrong product ID or invalid quantity';
    const ERRO = erroMensage(erroProductName);
    // Existe alguma venda que não foi preenchida corretamente?
    const productsErro = allProductSales.filter((sale) =>
     typeof sale.quantity !== 'number' || sale.quantity < 1);
   
     // Caso exista, apenas retorne o erro!
     if (productsErro.length > 0) {
        return res.status(HTTP_ERR_FALSE).json(ERRO);
    }
    
      next();
    };

    const ifSaleIdNotExists = async (req, res, next) => {
      const { id } = req.params;
      const message = 'Sale not found';
      const ERRO = erroMensageSales(message);
      if (id.length !== 24) {
        return res.status(HTTP_ERR_404).json(ERRO);
      }
    
      next();
    };

module.exports = { salesWithAllProductValid, ifSaleIdNotExists };
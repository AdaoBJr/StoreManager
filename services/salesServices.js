// const HTTP_OK_STATUS = 201;
// const HTTP_OK_DUZENTOS = 200;
const HTTP_ERR_FALSE = 422;

const erroMensage = (message) => ({
    err: {
      code: 'invalid_data',
      message,
    },
  });

const salesWithAllProductValid = (req, res, next) => {
    const allProductSales = req.body;
    const erroProductName = 'Wrong product ID or invalid quantity';
    const ERRO = erroMensage(erroProductName);
    const productsErro = allProductSales.filter((sale) =>
     typeof sale.quantity !== 'number' || sale.quantity < 1);
   
     if (productsErro.length > 0) {
        return res.status(HTTP_ERR_FALSE).json(ERRO);
    }
    
      next();
    };

module.exports = { salesWithAllProductValid };
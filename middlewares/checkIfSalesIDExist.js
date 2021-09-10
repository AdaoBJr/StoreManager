const { HTTP_NOT_FOUND_STATUS } = require('../httpResponde');
const { checkSalesId } = require('../model/salesModel');

const checkifSalesIDExist = async (req, res, next) => {
    const { id } = req.body;
    const exist = await checkSalesId({ id });

    if (!exist) {
      return res.status(HTTP_NOT_FOUND_STATUS).send({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      }); 
    }

    return next();
};

module.exports = checkifSalesIDExist;
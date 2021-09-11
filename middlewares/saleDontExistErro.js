const { HTTP_INVALID_DATA } = require('../httpResponde');
const { checkifSalesIDExist } = require('../model/salesModel');

const salesDontExistError = async (req, res, next) => {
    const { id } = req.params;

    const exist = await checkifSalesIDExist(id);
    if (!exist) {
      return res.status(HTTP_INVALID_DATA).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      }); 
    }

    return next();
};

module.exports = salesDontExistError;
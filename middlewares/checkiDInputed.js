const { ObjectId } = require('mongodb');
const { HTTP_INVALID_DATA } = require('../httpResponde');

const checkiDInputed = (req, res, next) => {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(HTTP_INVALID_DATA).send({
          err: {
              code: 'invalid_data',
              message: 'Wrong id format',
          },
      }); 
    }

    return next();
};

module.exports = checkiDInputed;
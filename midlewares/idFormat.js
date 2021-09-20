const { ObjectId } = require('mongodb');

const wrongIdFormat = {
  err: { 
    code: 'invalid_data', 
    message: 'Wrong id format',
  } };

const verifyIdFormat = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(422).json(wrongIdFormat);
  next();
};

module.exports = verifyIdFormat;
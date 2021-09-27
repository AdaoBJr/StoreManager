const errors = {
    name: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
      status: 422,
    },
  
    exist: {
      code: 'invalid_data',
      message: 'Product already exists',
      status: 422,
    },
  
    quantity: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
      status: 422,
    },
  
    quantityType: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
      status: 422,
    },
  };
  
  module.exports = (err, _req, res, _next) => {
    console.log(err);
    console.log(errors[err.statusCode]);
    if (err.statusCode) {
      const { code, message, status } = errors[err.statusCode];
      return res.status(status).json({ err: { code, message } });
    }
    return res.status(500).json({ message: err.message });
  };

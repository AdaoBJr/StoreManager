// hello-msc/middlewares/error.js
module.exports = (err, req, res, _next) => {
    if (err.isJoi) {
      return res.status(422)
        .json({ err: { 
            code: 'invalid_data',
            message: err.details[0].message } });
    }
  
    const statusByErrorCode = {
      notFound: 404,
      alreadyExists: 409,
    };
  
    const status = statusByErrorCode[err.code] || 500;
  
    res.status(status).json({ err: { 
        code: 'invalid_data',
        message: err.message } });
  };
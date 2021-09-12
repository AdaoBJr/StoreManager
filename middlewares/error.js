module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }

  if (err.statusCode) {
    const { code, message, statusCode } = err;
    return res.status(statusCode).json({ err: { code, message } });
  } 
    return res.status(500).json({ code: 'Internal_Server_Error', message: err.message });
};
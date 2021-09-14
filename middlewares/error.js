module.exports = (err, _req, res, _next) => {
  // if (err.isJoi) {
  //   return res.status(400)
  //     .json({ error: { message: err.details[0].message } });
  // }

  const statusByErrorCode = {
    notFound: 404,
    invalid_data: 422,
  };

  console.log(err.message);

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ err: { code: err.code, message: err.message } });
};
const error = (err, _req, res, _next) => {
  const errorCode = {
    invalidData: 422,
    notFound: 404,
    stockProblem: 404,
  };

  const errorStatusService = 500;

  if (err.isJoi) {
    return res.status(errorCode.invalidDdata)
      .json({ err: { code: 'invalidData', message: err.details[0].message } });
  }

  const status = errorCode[err.code] || errorStatusService;

  res.status(status).json({ err: { code: err.code, message: err.message } });
};

module.exports = error;

// ajuda dos colegas de classe discord
module.exports = (err, _req, res, _next) => {
  // Objeto com status code
  const errorStatusCode = {
    notFound: 404,
    invalidData: 422,
    alreadyExists: 422,
  };
  // Verifica se o joi indicou algum erro
  if (err.isJoi) {
    return res.status(errorStatusCode.invalidData)
      .json({ err: { code: 'invalid_data', message: err.details[0].message } });
  }
  // Recebe o staus code do erro
  const status = errorStatusCode[err.code] || 500;
  // Retorna o status code e a mensagem de erro
  res.status(status).json({ error: { message: err.message } });
};

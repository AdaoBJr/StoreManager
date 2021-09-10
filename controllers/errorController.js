module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422)
      .json({ err: { message: err.details[0].message } });
  }

  const statusByErrorCode = {
    invalidData: 422, // Erro de dados inválidos
    notFound: 404, // Erros do tipo `notFound` retornam status 404 Not Found
    alreadyExists: 409, // Erros do tipo `alreadyExists` retornam status 409 Conflict
    // Podemos adicionar quantos códigos novos desejarmos
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ error: { message: err.message } });
};
const UNPROCESSABLE_ENTITY = 422;

console.log('isError');

module.exports = (err, req, res, _next) => {
  console.log(err);
  if (err.isError) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }

  res.status(UNPROCESSABLE_ENTITY).json({
    err: {
      code: UNPROCESSABLE_ENTITY,
      message: 'ok',
    },
  });
};
// A ideia do código estruturado desta forma foi do colega Henrique Clementino.

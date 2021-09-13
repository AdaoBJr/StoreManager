const error = (msg) => ({
    err: {
      code: 'invalid_data',
      message: msg,
    },
  });

const errorNotFound = (msg) => ({
  err: {
    code: 'not_found',
    message: msg,
  },
});
module.exports = { error, errorNotFound };
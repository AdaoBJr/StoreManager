function formatError(message) {
  return {
      err: {
        code: 'invalid_data',
        message,
      },
  };
}

module.exports = {
  formatError,
};
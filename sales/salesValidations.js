const registeredProductValidate = async (param) => {
  const error = new Error();
    error.err = {
      code: 'invalid_data',
      message: 'Wrong product ID or invalido quantity',
    };

  for (let i = 0; i < param.length; i += 1) {
    if (!param) throw error;
    if (typeof param[i].quantity !== 'number') throw error;
  }
};

module.exports = {
  registeredProductValidate,
};

const getAll = (db) => {
  if (!db) {
    const error = new Error();
      error.err = 'Internal server Error';
      throw error;
  }
};

const getById = (sale, id) => {
  if (!sale || id !== true) {
    const error = new Error();
      error.err = {
        code: 'not_found',
        message: 'Sale not found',
      };
      throw error;
  }
};

const create = () => {};

const update = () => {};

const remove = () => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

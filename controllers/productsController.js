const STATUS_CREATED_SUCCESS = 201;
const STATUS_SUCCESS = 200;
const BAD_REQUEST = 422;

const getAll = async (req, res) => {
  const products = await getAllProducts();
  res.status(STATUS_SUCCESS).json(products);
};

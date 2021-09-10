const { HTTP_INVALID_DATA } = require('../httpResponde');
const { getProductByName } = require('../model/productsModel');

const productNameAlreadyTaken = {
    err: {
        code: 'invalid_data',
        message: 'Product already exists',
    },
};

const checkIfNameInputIsTaken = async (req, res, next) => {
    const { name } = req.body;
    const nameIsTaken = await getProductByName({ name });

    if (nameIsTaken) return res.status(HTTP_INVALID_DATA).send(productNameAlreadyTaken);

    return next();
};

module.exports = checkIfNameInputIsTaken;
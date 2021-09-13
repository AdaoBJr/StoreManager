const IdValidation = async (req, res, next) => {
    const { id } = req.params;

    if (!id || id.length !== 24) {
        return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
    next();
};

const QuantityValidation = async (req, res, next) => {
     const [{ quantity }] = req.body;
    // console.log(quantity, 'MIDD');

    if (quantity <= 0) {
        return res.status(422).json({ err: { 
            code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }

    if (typeof quantity !== 'number') {
        return res.status(422).json({ err: { 
            code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
    next();
};

module.exports = {
    IdValidation,
    QuantityValidation,
};
const app = require('express');

const { sell, getAll, findSale, updateSale } = require('../services/sales');

const router = app.Router();

router.route('/')
    .get(
        getAll,
    )
    .post(
        sell,
    );

router.route('/:id')
    .get(
        findSale,
    )
    .put(
        updateSale,
    );

module.exports = router;

// 613f9c9514a2217692eb6e17
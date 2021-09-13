const app = require('express');

const { sell, getAll, findSale } = require('../services/sales');

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
    );

module.exports = router;

// 613f9c9514a2217692eb6e17
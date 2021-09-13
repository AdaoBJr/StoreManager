const app = require('express');

const { sell } = require('../services/sales');

const router = app.Router();

router.route('/')
    .post(
        sell,
    );

module.exports = router;

// 613f9c9514a2217692eb6e17
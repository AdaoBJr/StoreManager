const rescue = require('express-rescue');
const controller = require('../Controllers/products');

const post2Create = (app) => {
    app.route('/products')
      .post(rescue(controller.create));
  };

module.exports = post2Create;

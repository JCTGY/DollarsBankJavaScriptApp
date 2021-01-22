'use strict';

module.exports = function(app) {
    const userController = require('../controller/userController');

    app.route('/user/:username')
        .get(userController.readUser);

}
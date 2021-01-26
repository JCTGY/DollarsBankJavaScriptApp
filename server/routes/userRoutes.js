'use strict';

module.exports = function(app) {
    const userController = require('../controller/userController');

    app.route('/user/login')
        .post(userController.login);
    app.route('/user/signup')
        .post(userController.signup);

}
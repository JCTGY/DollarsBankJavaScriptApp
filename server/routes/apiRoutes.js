'use strict';

module.exports = function(app) {
    const userController = require('../controller/userController');
    const accountController = require('../controller/accountController');
    const transactionController = require('../controller/transactionController');

    app.route('/user/login')
        .post(userController.login);
    app.route('/user/signup')
        .post(userController.signup);
    app.route('/account')
        .get(accountController.getAllAccountsByUserId)
        .put(accountController.updateAccountById)
        .post(accountController.insertNewAccount);
    app.route('/account/:accountId')
        .get(accountController.getAccountById);
    app.route('/transaction')
        .get(transactionController.getTransactionsByAccountId)
        .post(transactionController.insertNewTransaction);
}
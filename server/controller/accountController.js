'user strict';

const Account = require('../model/acountModel');

exports.getAllAccountsByUserId = (req, res) => {
    Account.getAccountsByUserId(req.query.userId, (err, accounts) => {
        if (err) console.log(err);
        res.json(accounts);
    })
}

exports.getAccountById = (req, res) => {
    Account.getAccountById(req.params.accountId, (err, account) => {
        if (err) console.log(err);
        res.json(account);
    })
}

exports.updateAccountById = (req, res) => {
    Account.updateAccount(req.body, (err, account) => {
        if (err) console.log(err);
        res.json(account);
    })
}

exports.insertNewAccount = (req, res) => {
    Account.insertNewAccount(req.body, (err, account) => {
        if(err) console.log(err);
        res.json(account);
    })
}
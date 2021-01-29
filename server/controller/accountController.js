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
        res.json(account[0]);
    })
}

exports.updateAccountById = (req, res) => {
    Account.updateAccount(req.body, (err, account) => {
        if (err) console.log(err);
        if (!account || account.length == 0) res.send(null);
        else res.json(account[0]);
    })
}

exports.insertNewAccount = (req, res) => {
    Account.insertNewAccount(req.body, (err, account) => {
        if(err) console.log(err);
        res.json(account);
    })
}
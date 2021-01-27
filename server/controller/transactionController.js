'use strict'

const Transaction = require('../model/transactionModel');

exports.getTransactionsByAccountId = (req, res) => {
    Transaction.getTransactionsByAccountId(req.query.accountId, (err, transactions) => {
        if (err) console.log(err);
        res.json(transactions);
    })
}

exports.insertNewTransaction = (req, res) => {
    Transaction.insertNewTransaction(req.body, (err, transaction) => {
        if (err) console.log(err);
        res.json(transaction);
    })
}
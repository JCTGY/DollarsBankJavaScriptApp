'user strict';

const sql = require('./connectionSQL');

const Transaction = function(transaction) {
    this.id = transaction.id,
    this.amount = transaction.amount,
    this.userId = transaction.userId,
    this.accountId = transaction.accountId,
    this.type = transaction.type,
    this.create_date = transaction.create_date;
}

Transaction.getTransactionsByAccountId = (accountId, result) => {
    const id = Number.parseInt(accountId, 10);
    sql.query("SELECT * FROM transaction WHERE account_id = ?", id, (err, res) => {
        if (err) console.log(err);
        else {
            result(null, res);
        }
    })
}

Transaction.insertNewTransaction = (transaction, result) => {
    transaction.create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("INSERT INTO transaction SET ?", transaction, (err, res) => {
        if (err) console.log(err);
        else {
            sql.query("SELECT * FROM transaction WHERE account_id = ?", transaction.account_id, (err, newList) => {
                if (err) console.log(err);
                else {
                    result(null, newList[newList.length - 1]);
                }
            })
        }
    })
}

module.exports = Transaction;
'user strict';

const sql = require('./connectionSQL');

const Account = function (account) {
    this.id = account.id,
        this.userId = account.user_id;
    this.balance = account.balance;
    this.type = account.type;
    this.modifyDate = account.modify_date;
    this.createDate = account.create_date;
}

Account.getAccountsByUserId = (userId, result) => {
    const id = Number.parseInt(userId, 10);
    sql.query("SELECT * FROM account WHERE user_id=?", id, (err, res) => {
        if (err) console.log(err)
        else {
            result(null, res);
        }
    })
}

Account.getAccountById = (accountId, result) => {
    const id = Number.parseInt(accountId, 10);
    sql.query("SELECT * FROM account WHERE account_id = ? LIMIT 1", id, (err, res) => {
        if (err) console.log(err);
        else {
            result(null, res);
        }
    })
}

Account.updateAccount = (account, result) => {
    account.modify_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("UPDATE account SET ? WHERE account_id = ?", [account, account.account_id], (err, res) => {
        if (err) console.log(err);
        else {
            if (!res) result("update falied", null);
            else {
                sql.query("SELECT * FROM account WHERE account_id = ? LIMIT 1", account.account_id, (err, updateAccount) => {
                    if (err) result(err, null);
                    result(null, updateAccount);
                });
            }
        }
    })
}

Account.insertNewAccount = (account, result) => {
    account.account_id = null;
    account.modify_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    account.create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("INSERT INTO account SET ?", account, (err, res) => {
        if (err) console.log(err);
        else {
            const id = account.user_id;
            sql.query("SELECT * FROM account WHERE user_id=?", id, (err, newAccount) => {
                if (err) console.log(err)
                else {
                    result(null, newAccount[newAccount.length - 1]);
                }
            })
        }
    })

}

module.exports = Account;
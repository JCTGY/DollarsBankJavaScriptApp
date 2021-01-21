'user strict';

const sql = require('./connectionSQL');

const User = function(user) {
    this.id = user.id,
    this.username = user.username,
    this.password = user.password,
    this.firstName = user.first_name,
    this.lastName = user.last_name,
    this.email = user.email,
    this.modifyDate = user.modify_date,
    this.createDate = user.create_date
}

User.getUserByUsername = (username, result) => {
    sql.query("SELECT * FROM user WHERE username=?", username, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            result(null, res);
        }
    })
}

module.exports = User;
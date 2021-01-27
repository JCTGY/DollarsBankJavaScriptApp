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

User.getUserByUsername = (username, password, result) => {
    sql.query("SELECT * FROM user WHERE username=?", username, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            if (res[0].password === password){
                res[0].password = "";
                result(null, res[0]);
            } else {
                result(null, null);
                // res.status(404).send("Invalid Password");
            }
        }
    })
}

User.insertNewUser = (user, result) => {
    user.create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    user.modify_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("INSERT INTO user SET ?", user, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            sql.query("SELECT * FROM user WHERE username=? limit 1", user.username, (err, newUser) => {
                if (err) result(err, null);
                result(null, newUser);
            })
        }
    });
}

module.exports = User;
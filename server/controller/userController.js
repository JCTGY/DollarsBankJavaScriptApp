'user strict';

const User = require('../model/userModel');

exports.login = function (req, res) {
  User.getUserByUsername(req.body.username, req.body.password, function (err, user) {
    if (err)
      res.send(err);
    else if (!user)
      res.json({
        error: "Invalid Password"
      });
    else
      res.json(user);
  });
};

exports.signup = function (req, res) {
  User.insertNewUser(req.body, function (err, user) {
    if (err)
      res.send(err);
    else if (!user)
      res.json({
        error: "Username duplicate"
      });
    else
      res.json(user);
  });
}
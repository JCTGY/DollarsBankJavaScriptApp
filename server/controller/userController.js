'user strict';

const User = require('../model/userModel');

exports.readUser = function(req, res) {
    User.getUserByUsername(req.params.username, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };
  
'use strict';

require('dotenv').config();
const mysql = require('mysql'); 

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
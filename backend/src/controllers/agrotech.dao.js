const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
});

module.exports = con;
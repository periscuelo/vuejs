const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'myuser',
  password: 'mypass',
  database: 'seek',
  port: 3306,
  debug: false,
  multipleStatements: true,
});

module.exports.connection = connection;

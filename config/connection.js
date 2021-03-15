// import mysql package so it is defined in the connection
const mysql = require('mysql');

// Enable access to .env variables to keep password private
require('dotenv').config()

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: process.env.DB_USER,
  
    // Your password
    password: process.env.DB_PASS,

    // Name of database
    database: 'employees_db',
  });

  module.exports = connection;
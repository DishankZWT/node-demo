// import mysql from 'mysql2';
const mysql = require('mysql2');
// import { env } from 'node:process';
const dotenv = require('dotenv').config();

const pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    host:'127.0.0.1',
    user:'admin',
    password:'root',
    database:'mydb'
}).promise();

const [result] = await pool.query("SELECT * FROM temp");
console.log(result);

console.log(process.env.MYSQL_USER);

module.exports = {pool} ;
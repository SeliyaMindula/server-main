require('dotenv').config();
const mysql = require('mysql2');
const { ENVIRONMENT } = require('.');

// const pool = mysql.createPool({
//     host:'127.0.0.1',
//     user:'ysnfebfbch',
//     password:'J26AYymb9t',
//     database:'ysnfebfbch',
//     connectionLimit:10
// });


// Local Development Database Connection
// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'ysnfebfbch',
//     connectionLimit:10
// });


// Development Database Connection
const pool = mysql.createPool({
    // host: ENVIRONMENT === "development" ? process.env.HOST : '127.0.0.1',
    // user: ENVIRONMENT === "development" ? process.env.USER : 'ysnfebfbch',
    // password: ENVIRONMENT === "development" ? process.env.PASS : 'J26AYymb9t',
    // database: ENVIRONMENT === "development" ? process.env.DB : 'ysnfebfbch',
    host: ENVIRONMENT === "development" ? process.env.HOST : '64.225.9.41',
    user: ENVIRONMENT === "development" ? process.env.USER : 'dvurssqgcr',
    password: ENVIRONMENT === "development" ? process.env.PASS : 'vW82ryJ6GS',
    database: ENVIRONMENT === "development" ? process.env.DB : 'dvurssqgcr',
    connectionLimit: 10
    
});


// const pool = mysql.createPool({
//     host: '165.232.161.41',
//     user: 'ysnfebfbch',
//     password: 'J26AYymb9t',
//     database: 'ysnfebfbch',
//     connectionLimit: 10
// });


// Production Database Connection
// const pool = mysql.createPool({
//     host: '165.232.161.41',
//     user: 'jzjzbxguhr',
//     password: 'agVgbv3UGr',
//     database: 'jzjzbxguhr',
//     connectionLimit: 10
// });



const promisePool = pool.promise();


module.exports = promisePool;
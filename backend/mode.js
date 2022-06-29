const mysql = require('mysql2/promise');
const dbConfig = require("./config/db.config");

// создаем соединение с нашей базой данных
const pool = mysql.createPool({
    connectionLimit: 15,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    port: dbConfig.port
});
module.exports = pool;
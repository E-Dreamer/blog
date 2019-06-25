const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    //开启执行多条sql语句的功能
    multipleStatements: true
});

module.exports = conn;
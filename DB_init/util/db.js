const mysql = require('mysql');
const config = require("../../config");


const DBConfig = config.database;
// 创建连接池
const pool = mysql.createPool({
    connectionLimit:  10,
    host: DBConfig.HOST,
    user: DBConfig.USERNAME,
    password: DBConfig.PASSWORD,
    database: DBConfig.DATABASE
})



/**
 * 
 * @param {sql} sql sql语句
 * @param {any} values 查询的值
 * @returns {Promise} 返回查询结果promise
 * 输入sql语句向数据库查询，并返回一个promise
 */
let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // not connected
            if(err) {
                return reject(err);
            };
            connection.query(sql, values, (err, {results, fields}) => {
                // 无论查询结果如何，先关闭连接
                connection.release();
                if (err) {
                    return reject(err);
                } else {
                    resolve({ results, fields })
                }
            })
        })
    })
}

module.exports = query;
const mysql = require("mysql")
// 连接池 
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    port: 3306,
    database: "blog",
    // timezone:"08:00"
    dateStrings:true,
    connectionLimit:20
})
module.exports = {
    pool,
}

const mysql = require('mysql')
// 连接池 
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'blog',
    dateStrings:true,
    connectionLimit:20 //最大连接数量
})
module.exports = {
    pool,
}

const {pool}  = require('../mysql')
const webSearchList = (keywords) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject({ code: 0, err })
            const data = {
                code: 1,
                message: '查询获取成功',
                notelist: [],
            }
            const result = `select * from articles where Title like '%${keywords}%';`
            connection.query(result, [], (err, res) => {
                if (err) {
                    connection.release()
                    return reject({ code: 0, err })
                }
                for (let index = 0; index < res.length; index++) {
                    data.notelist.push(res[index])
                }
                connection.release()
                resolve(data)
                // console.log(data);
            })
        })
    }).catch((error)=>{
        return error
    })
}
module.exports = {
    webSearchList
}
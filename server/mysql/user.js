const bcrypt = require('bcrypt');
const { pool } = require('../mysql')
const login = (Username, Password) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            const result = `SELECT Password FROM Users WHERE username = '${Username}'`
            connection.query(result, [Username, Password], async (err, results) => {
                // console.log(results.length);
                if (err) {
                    connection.release();
                    console.log("连接数据库失败");
                    resolve({ code: 0, message: "登录失败,请稍后再试" })
                }
                if (results.length >= 1) {
                    // results[0].Password === Password
                    if (await bcrypt.compare(Password, results[0].Password)) {
                        connection.release();
                        resolve({ code: 1, message: "登录成功" })
                    } else {
                        connection.release();
                        resolve({ code: 0, message: "登录失败 密码与用户名不一致" })
                    }
                } else {
                    connection.release();
                    resolve({ code: 0, message: "登录失败 用户名不存在" })
                }
            })
        })
    }
    )
}
// 获取用户信息 头像 文章数量 
const getUser = (Username) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
        const result = `SELECT u.Avatar avatar,count(a.ArticleID) number FROM Users u,articles a WHERE u.username = '${Username}'and a.UserID =u.UserID`
        connection.query(result, [Username], (err, res) => {
            if (err) {
                connection.release();
                console.log("连接数据库失败");
                resolve({ code: 0, message: "登录失败,请稍后再试" })
            }
            if (res.length >= 1) {
                connection.release();
                // console.log(res[0].avatar,res[0].number);
                resolve({ code: 1, message: '获取成功', avatar: res[0].avatar, number: res[0].number })
            } else {
                connection.release();
                resolve({ code: 0, message: "获取失败" })
            }
        })
    })
    })
}
module.exports = {
    login,
    getUser
}
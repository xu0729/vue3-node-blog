
const { pool } = require('../mysql')

const setnotes = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            const result = `insert into articles (Title,Introduction,Tags,Content,UserID) values ('${data.title}','${data.introduction}','${data.tag}',"${data.Content}",(select UserID from users where Username = '${data.username}'))`
            connection.query(result, (err, res) => {
                if (err) {
                    console.log(err);
                    connection.release();
                    resolve({ code: 0, message: "发布失败,格式错误调整格式" })
                    return 
                }
                if (res) {
                    connection.release();
                    resolve({ code: 1, message: "发布成功" })
                } else {
                    connection.release();
                    reject({ code: 0, message: "发布失败" })
                }
            })
        })
    })
}
const getnote = (noteData) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            const data = {}
            data.notes = []
            const result = `select * from articles where UserID = (select UserID from users where Username = '${noteData.username}') order by DATE desc limit ${noteData.pagesize} offset ${(noteData.pagenum - 1) * noteData.pagesize}`
            connection.query(result, [], (err, res) => {
                if (err) {
                    connection.release();
                    reject({ code: 0, message: "登录失败,请稍后再试" })
                }
                // console.log(res);
                if (res) {
                    // console.log(res.length);
                    for (let index = 0; index < res.length; index++) {
                        data.notes.push(res[index])
                    }
                    connection.query(`SELECT COUNT(*) as total FROM articles where UserID =(select UserID from users where Username = '${noteData.username}')`, [], (error, res2) => {
                        if (error) {
                            connection.release();
                            reject({ code: 0, message: "请稍后再试" })
                        }
                        data.code = 1
                        data.number = res2[0].total
                        connection.release();
                        resolve(data)
                    })
                } else {
                    connection.release();
                    reject({ code: 0, message: "查询失败,请稍后再试" })
                }
            })
        })
    })
}
const delnote = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release()
                resolve({ code: 0, message: "数据库连接失败" })
            }
            const result = `delete from articles where ArticleID = ${id} `
            connection.query(result, [], (error, res) => {
                if (error) {
                    connection.release()
                    resolve({ code: 0, message: "查询失败" })
                }
                if (res) {
                    connection.release()
                    resolve({ code: 1, message: '删除成功' })
                }
            })
        })
    })
}
const modifynote = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            console.log(data);
            const result = `update articles set Title = '${data.title}', Introduction='${data.introduction}',Tags = '${data.tag}',Content='${data.Content}' where ArticleID=${data.id} and UserID = (select UserID from users where Username= '${data.username}')`
            connection.query(result, (err, res) => {
                if (err) {
                    console.log(err);
                    console.log("连接数据库失败");
                    resolve({ code: 0, message: "请稍后再试" })
                }
                if (res) {
                    connection.release();
                    resolve({ code: 1, message: "修改成功" })
                } else {
                    connection.release();
                    reject({ code: 0, message: "修改失败" })
                }
            })
        })
    })
}
const webGgetNoteList = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return connection.release()
            const result = 'select * from articles order by Date desc limit 0,10;'
            connection.query(result, [], (err, res) => {
                const data = {}
                data.notes = []
                if (err) {
                    connection.release()
                    reject({ code: 0, message: '获取文章失败 稍后再试' })
                } else {
                    for (let index = 0; index < res.length; index++) {
                        data.notes.push(res[index])
                        data.notes[index].Date = data.notes[index].Date.split(" ")[0]
                    }
                    connection.release()
                    data.code = 1
                    data.message = '获取成功'
                    resolve(data)
                    // console.log(data.notes[1]);
                }
            })
        })
    }).catch((err) => {
        return err
    })
}
const webGetNote = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return connection.release()
            const result = `select * from articles where ArticleID = ${id};`
            connection.query(result, [], (error, res) => {
                const data = {
                    code: 1,
                    message: "文章获取成功"
                }
                if (error) {
                    connection.release()
                    reject({ code: 0, message: '文章获取失败' })
                } else {
                    connection.release()
                    data.note = res[0]
                    resolve(data)
                }
            })
        })
    }).catch((err) => {
        return err
    })
}
const webGgetNoteLimit = (page, pagesize) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject({ code: 0, message: err })
            const data = {
                code: 1,
                message: '文章获取成功',
                notelist: [],
            }
            const result = 'select * from articles order by Date desc limit ? offset ?;'
            connection.query(result, [pagesize * 1, (page - 1) * pagesize], (err, res) => {
                if (err) {
                    connection.release()
                    return reject({ code: 0, message: '文章获取失败', err })
                }
                for (let index = 0; index < res.length; index++) {
                    data.notelist.push(res[index])
                }
                connection.query('select count(ArticleID) number from articles', [], (err, res) => {
                    if (err) {
                        connection.release()
                        return reject({ code: 0, message: '文章获取失败', err })
                    }
                    connection.release()
                    data.total = res[0].number
                    resolve(data)
                })
                // console.log(data.notelist);
            })
        })
    }).catch((error) => {
        console.log(error);
        return error
    })
}
const webSearchList = (keywords) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject({ code: 0, err })
            const data = {
                code: 1,
                message: "查询获取成功",
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
    setnotes,
    getnote,
    delnote,
    modifynote,
    webGgetNoteList,
    webGetNote,
    webGgetNoteLimit,
    webSearchList
}
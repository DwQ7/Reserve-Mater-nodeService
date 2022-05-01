const userSQL = require("../db/userSQL");
const mysql = require('mysql');
const dbConfig = require("../db/dbconfig");
const pool = mysql.createPool(dbConfig.mysql);

function updateUserName(newName,userId){
    return new Promise((resolve,reject) =>{
        let response = {}
        pool.getConnection(function (err,connection) {
            connection.query(userSQL.updateUserName,[newName,userId],function (err,result) {
                if(result){
                    response.status = 1
                    response.message = '修改成功'
                    resolve(response)
                }else{
                    response.status = 0
                    response.message = '修改失败'
                    reject(response)
                }
            })
        })
    })
}

exports.updateUserName = updateUserName
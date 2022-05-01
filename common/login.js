const userSQL = require("../db/userSQL");
const dbConfig = require("../db/dbconfig");

const mysql = require('mysql');
const pool = mysql.createPool(dbConfig.mysql);



function getLogin(userNo,passWord){
    return new Promise((resolve,reject) =>{
        let response = {}
        pool.getConnection(function (err,connection) {
            connection.query(userSQL.getUserByNo,userNo,function (err,result) {
                if(result.length < 1){
                    response.status = 0
                    response.message = "Account does not exist"
                    resolve(response)
                }
                else{
                    //把results字符串转为json对象
                    result = JSON.parse(JSON.stringify(result))
                    if(result[0].password === passWord){
                        let username = result[0].user_name
                        let userId = result[0].user_id
                        response.status = 1
                        response.message = username
                        response.sno = userNo
                        response.userId = userId
                        resolve(response)
                    }else{
                        response.status = -1
                        response.message = "Password error"
                        resolve(response)
                    }
                }
            })
        })
    })
}

exports.getLogin = getLogin
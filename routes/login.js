const express = require('express');
const router = express.Router();
const dbConfig = require('../db/dbconfig');
const userSQL = require('../db/userSQL');

const mysql = require('mysql');
const pool = mysql.createPool(dbConfig.mysql);

/**
 * 登录
 * userNo 学号/工号
 * psssword 密码
 */
router.post('/', function(req, res, next) {
    //获取客户端发来的数据
    let body = req.body;
    let response = {}
    pool.getConnection(function (err,connection) {
        connection.query(userSQL.getUserByNo,body.userNo,function (err,result) {
            if(result.length < 1){
                response.status = 0
                response.message = "Account does not exist"
                res.send(response)
            }
            else{
                //把results字符串转为json对象
                result = JSON.parse(JSON.stringify(result))
                if(result[0].password === body.password){
                    let username = result[0].user_name
                    response.status = 1
                    response.message = username
                    response.sno = body.userNo
                    // req.session.username = username
                    res.send(response)
                }else{
                    response.status = -1
                    response.message = "Password error"
                    res.send(response)
                }
            }
        })
    })
});

module.exports = router;

const express = require('express');
const router = express.Router();
const dbConfig = require('../db/dbconfig');
const userSQL = require('../db/userSQL');

const mysql = require('mysql');
const pool = mysql.createPool(dbConfig.mysql);


router.post('/', function(req, res, next) {
  //获取客户端发来的数据
  let body = req.body;
  let response = {}
  pool.getConnection(function (err,connection) {
    connection.query(userSQL.updateUserName,[body.newName,body.userNo],function (err,result) {
      if(result){
        response.status = 1
        response.message = '修改成功'
        res.send(response)
      }else{
        response.status = 0
        response.message = '修改失败'
        res.send(response)
      }
    })
  })
});


module.exports = router;

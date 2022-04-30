const express = require('express');
const router = express.Router();
const dbConfig = require('../db/dbconfig');
const reservationSQL = require('../db/reservationSQL')

const mysql = require('mysql');
const pool = mysql.createPool(dbConfig.mysql);

const classroom = require('../common/classroom')

/**
 * 根据学号/工号获取预订信息
 * param {number} userNo
 */
router.get('/', function(req, res, next) {
    //获取客户端发来的数据
    let userNo = req.query.userNo
    let response = {}
    pool.getConnection(function (err, connection) {
        connection.query(reservationSQL.getReservationByUserNo, userNo, function (err, result) {
            result.forEach((item,index) =>{
                response[index] = item
            })
            res.send(response)
        })
    });
})
/**
 * 预约
 * userId 用户编号
 * date 星期数
 * start 开始节数
 * last 持续节数
 * classroomId 教室编号
 */
router.post('/', function(req, res, next) {
    //获取客户端发来的数据
    let body = req.body;
    let response = {}
    classroom.getFreeClassroom(new Date(body.date).getDay() - 1,body.start,body.last).then((date) =>{
        console.log(date);
        if(!date.includes(Number(body.classroomId))){
            response.status = 0
            response.message = '该时段不可预约'
            res.send(response)
        }else{
            pool.getConnection(function (err,connection) {
                connection.query(reservationSQL.insert,[body.date,body.start,body.last,body.classroomId,body.userId],function (err,result) {
                    console.log(result);
                    response.status = 1
                    response.message = 'success'
                    res.send(response)
                })
            })
        }
    })

});
module.exports = router;
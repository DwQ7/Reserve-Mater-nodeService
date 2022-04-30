const express = require('express');
const router = express.Router();
const dbConfig = require('../db/dbconfig');
const statusSQL = require('../db/statusSQL');
const week =require('../db/week')
const mysql = require('mysql');
const pool = mysql.createPool(dbConfig.mysql);

/**
 * 获取教室状态信息（一周的状态码）
 * param {number} classroomId
 */
router.get('/byId', function(req, res, next) {
    //获取客户端发来的数据
    let classroomId = req.query.classroomId
    let response = {}
    pool.getConnection(function (err, connection) {
        connection.query(statusSQL.getClassRoomById, classroomId, function (err, result) {
            result.forEach((item,index) =>{
                item.week = week[item.date.getDay() - 1]
                item.status = item.status.split('')
                response[index] = item
            })
            res.send(response)
        })
    });
})
/**
 * 获取指定日期的所有教室状态
 * param {number} date
 */
router.get('/byDate', function(req, res, next) {
    //获取客户端发来的数据
    let date = req.query.date
    let response = {}
    pool.getConnection(function (err, connection) {
        connection.query(statusSQL.getClassRoomByDate, date, function (err, result) {
            result.forEach((item,index) =>{
                item.week = week[item.date.getDay() - 1]
                item.status = item.status.split('')
                response[index] = item
            })
            res.send(response)
        })
    });
})
module.exports = router;
const express = require('express');
const router = express.Router();
const dbConfig = require('../db/dbconfig');
const classroomSQL = require('../db/classroomSQL');
const statusSQL = require('../db/statusSQL');
const mysql = require('mysql');
const reservationSQL = require("../db/reservationSQL");
const pool = mysql.createPool(dbConfig.mysql);
const classroom = require('../common/classroom')
/**
 * 根据id获取教室信息
 * param {number} classroomId
 */
router.get('/byId', function(req, res, next) {
    //获取客户端发来的数据
    let classroomId = req.query.classroomId
    let response = {}
    pool.getConnection(function (err, connection) {
        connection.query(classroomSQL.getClassRoomById, classroomId, function (err, result) {
            response = result[0]
            res.send(response)
        })
    });
})

/**
 * 根据时间范围获取教室信息
 */
router.get('/byTime', function(req, res, next) {
    //获取客户端发来的数据
    let day = Number(req.query.day)
    let start = Number(req.query.start)
    let last = Number(req.query.last)
    classroom.getFreeClassroom(day,start,last).then((date) =>{
        Promise.all(classroom.getFreeClassroomDetail(date)).then((response) =>{
            res.send(response)
        })
    })
})
/**
 * 所有教室列表
 */
router.get('/all', function(req, res, next) {
    //获取客户端发来的数据
    let response = {}
    pool.getConnection(function (err, connection) {
        connection.query(classroomSQL.queryAll,function (err, result) {
            result.forEach((item,index) =>{
                response[index] = item
            })
            res.send(response)
        })
    });
})

module.exports = router

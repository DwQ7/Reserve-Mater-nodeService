const express = require('express');
const router = express.Router();

const classroom = require('../common/classroom')
const status = require('../common/status')
const reservation = require("../common/reservation");

/**
 * 根据学号/工号获取预订信息
 * param {number} userNo
 */
router.get('/', function(req, res, next) {
    //获取客户端发来的数据
    let userNo = req.query.userNo
    reservation.getReservationById(userNo).then((data) =>{
        res.send(data)
    })
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
    classroom.getFreeClassroom(new Date(body.date).getDay() - 1,body.start,body.last).then((data) =>{
        if(!data.includes(Number(body.classroomId))){
            response.status = 0
            response.message = '该时段不可预约'
            res.send(response)
        }else{
            reservation.doReservation(body.date, body.start, body.last, body.classroomId, body.userId).then((info) =>{
                status.getStatusByDateAndId(info.date,info.classroomId).then((oldStatus) =>{
                    status.updateStatusBy(oldStatus,body.date,body.classroomId,Number(body.start),Number(body.last)).then((info) =>{
                        res.send('预约成功')
                    })
                })
            })
        }
    })

});
module.exports = router;
const express = require('express');
const router = express.Router();

const classroom = require('../common/classroom')
/**
 * 根据id获取教室信息
 * param {number} classroomId
 */
router.get('/byId', function(req, res, next) {
    //获取客户端发来的数据
    let classroomId = req.query.classroomId
    classroom.getClassroomById(classroomId).then((data) =>{
        res.send(data)
    })
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
    classroom.getAllClassroom().then((data) =>{
        res.send(data)
    })

})

module.exports = router

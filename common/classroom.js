const statusSQL = require("../db/statusSQL");
const classroomSQL = require("../db/classroomSQL");
const mysql = require("mysql");
const dbConfig = require("../db/dbconfig");
const pool = mysql.createPool(dbConfig.mysql);
/**
 * 获取在指定时间内空闲的教室编号
 * @param day 周几
 * @param start 开始节数
 * @param last 持续节数
 * @returns {Promise<unknown>}
 */
function getFreeClassroom(day,start,last){
    return new Promise((resolve,reject) =>{
        let freeClassroom = []
        pool.getConnection(function (err, connection) {
            connection.query(statusSQL.queryAll,function (err, result) {
                result.forEach((item) =>{
                    if(item.date.getDay() - 1 === day && Number(item.status.slice(start,start+last)) === 0){
                        freeClassroom.push(item.reservation_classroom_id)
                    }
                })
                resolve(freeClassroom)
            })
        });
    })
}

/**
 * 传入教室编号列表，返回教室具体信息数组
 * @param arr
 * @returns {*|*[]}
 */
function getFreeClassroomDetail(arr){
    let results = []
    results = arr.map((item) =>{
        return new Promise((resolve,reject) =>{
            pool.getConnection(function (err, connection) {
                connection.query(classroomSQL.getClassRoomById, item, function (err, result) {
                    resolve(result[0])
                })
            })
        })
    })
    return results
}

exports.getFreeClassroom = getFreeClassroom
exports.getFreeClassroomDetail = getFreeClassroomDetail
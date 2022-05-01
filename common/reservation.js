const reservationSQL = require("../db/reservationSQL");
const status = require("./status");
const mysql = require('mysql');
const dbConfig = require("../db/dbconfig");
const pool = mysql.createPool(dbConfig.mysql);

function getReservationById(userNo){
    return new Promise((resolve,reject) =>{
        let response = {}
        pool.getConnection(function (err, connection) {
            connection.query(reservationSQL.getReservationByUserNo, userNo, function (err, result) {
                result.forEach((item,index) =>{
                    response[index] = item
                })
                resolve(response)
            })
        });
    })
}

function doReservation(date,start,last,classroomId,userId){
    return new Promise((resolve,reject) =>{
        pool.getConnection(function (err,connection) {
            connection.query(reservationSQL.insert,[date,start,last,classroomId,userId],function (err,result) {
                if(result){
                  let response = {}
                  response.date = date
                  response.classroomId = classroomId
                  resolve(response)
                }else{
                    reject('err')
                }
            })
        })
    })
}

exports.getReservationById = getReservationById
exports.doReservation = doReservation
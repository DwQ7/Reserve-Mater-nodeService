const mysql = require("mysql");
const dbConfig = require("../db/dbconfig");
const statusSQL = require("../db/statusSQL");
const pool = mysql.createPool(dbConfig.mysql);

function getStatusByDateAndId(date,classroomId){
    return new Promise((resolve,reject) =>{
        pool.getConnection(function (err, connection) {
            connection.query(statusSQL.getStatusByDateAndId,[date,classroomId],function (err, result) {
                if(result){
                    resolve(result[0].status)
                }else{
                    reject('no find')
                }
            })
        });
    })
}

function updateStatus(oldStatus,date,classroomId,start,last){
    return new Promise((resolve,reject) =>{
        let newStatus =  oldStatus.split('').map((item, index) => {
            console.log(item);
            if(index >= start -1 && index < start+last-1){
                return '1'
            }else{
                return item
            }
        }).join('')
        pool.getConnection(function (err, connection) {
            connection.query(statusSQL.updateStatus,[newStatus,date,classroomId],function (err, result) {
                if(result){
                    resolve(result)
                }else{
                    reject('no find')
                }
            })
        });
    })
}


exports.getStatusByDateAndId = getStatusByDateAndId
exports.updateStatusBy = updateStatus

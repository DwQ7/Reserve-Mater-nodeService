/**
 * 教室状态
 */

const StatusSQL = {
    // insert:'INSERT INTO classroom(classroom_location,classroom_detail,classroom_pic) VALUES(?,?,?)',
    getStatusById:'SELECT * FROM status WHERE reservation_classroom_id = ?',
    queryAll:'SELECT * FROM status',
    getClassRoomByDate:'SELECT * FROM status WHERE date = ?',
    updateStatus:'UPDATE status set status = ? where date = ? and reservation_classroom_id = ?',
    getStatusByDateAndId:'SELECT status FROM status WHERE date = ? and reservation_classroom_id = ?',
};


module.exports = StatusSQL;
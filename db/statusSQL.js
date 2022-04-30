/**
 * 教室状态
 */

const StatusSQL = {
    // insert:'INSERT INTO classroom(classroom_location,classroom_detail,classroom_pic) VALUES(?,?,?)',
    getClassRoomById:'SELECT * FROM status WHERE reservation_classroom_id = ?',
    queryAll:'SELECT * FROM status',
    getClassRoomByDate:'SELECT * FROM status WHERE date = ?',
};


module.exports = StatusSQL;
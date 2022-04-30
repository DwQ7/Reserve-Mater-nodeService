/**
 * 教室状态
 */

const StatusSQL = {
    // insert:'INSERT INTO classroom(classroom_location,classroom_detail,classroom_pic) VALUES(?,?,?)',
    getClassRoomById:'SELECT * FROM status WHERE reservation_classroom_id = ?'
};


module.exports = StatusSQL;
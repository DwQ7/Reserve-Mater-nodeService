/**
 * 教室
 * 根据教室id获取教室信息
 */
const ClassRoomSQL = {
    insert:'INSERT INTO classroom(classroom_location,classroom_detail,classroom_pic) VALUES(?,?,?)',
    getClassRoomById:'SELECT * FROM classroom WHERE classroom_id = ? '
};


module.exports = ClassRoomSQL;

/**
 * 课程
 * 根据教室id获取教室信息
 */
const CourseSQL = {
    // insert:'INSERT INTO classroom(classroom_location,classroom_detail,classroom_pic) VALUES(?,?,?)',
    getClassRoomById:'SELECT * FROM course WHERE course_id = ? '
};


module.exports = CourseSQL;
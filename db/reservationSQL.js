/**
 * 根据学号
 * 拿到用户编号
 * 返回预约日期
 * 预约开始，持续节数
 * 教室编号
 * 教室地点、描述、图片
 */

const ReservationSQL = {
    insert:'INSERT INTO reservation(reservation_date,reservation_start,reservation_time,reservation_classroom_id,reservation_user_id) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM reservation',
    getReservationById:'SELECT * FROM user WHERE reservation_id = ? ',
    getReservationByDate:'SELECT * FROM user WHERE reservation_date = ?',
    getReservationByUserId:'SELECT * FROM user WHERE reservation_user_id = ?',
    getReservationByClassroomId:'SELECT * FROM user WHERE reservation_classroom_id = ?',
    getReservationByUserNo:'SELECT * FROM reservation where reservation_user_id = (SELECT user_id from user where user_no = ?)',
};
module.exports = ReservationSQL;
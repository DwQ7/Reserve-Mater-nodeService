/**
 * 根据学号
 * 拿到用户编号
 * 返回预约日期
 * 预约开始，持续节数
 * 教室编号
 * 教室地点、描述、图片
 */

const ReservationSQL = {
    insert:'INSERT INTO Reservation(reservation_date,reservation_start,reservation_time,reservation_classroom_id,reservation_user_id) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM reservation',
    getReservationById:'SELECT * FROM user WHERE reservation_id = ? ',
    getReservationByDate:'',
    getReservationByUserId:'',
    getReservationByClassroomId:''
};
module.exports = ReservationSQL;
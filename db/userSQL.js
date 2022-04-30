const UserSQL = {
    insert:'INSERT INTO User(user_name,user_no,password) VALUES(?,?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE user_id = ? ',
    getUserByNo:'SELECT * FROM user WHERE user_no = ? ',
    getUserIdByUserNo:'SELECT user_id FROM user WHERE user_no = ? ',
    updateUserName:'UPDATE user set user_name = ? where user_id = ?',
};
module.exports = UserSQL;
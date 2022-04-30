const UserSQL = {
    insert:'INSERT INTO User(user_name,user_no,password) VALUES(?,?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE user_id = ? ',
    getUserByNo:'SELECT * FROM user WHERE user_no = ? ',
};
module.exports = UserSQL;
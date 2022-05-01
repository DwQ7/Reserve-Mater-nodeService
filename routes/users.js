const express = require('express');
const users = require("../common/users");
const router = express.Router();

/**
 * 修改用户名
 */
router.post('/', function(req, res, next) {
  //获取客户端发来的数据
  let body = req.body;
  users.updateUserName(body.newName,body.userId).then((data) =>{
    res.send(data)
  })
});


module.exports = router;

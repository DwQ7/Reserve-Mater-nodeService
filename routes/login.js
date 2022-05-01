const express = require('express');
const router = express.Router();

const login = require('../common/login')

/**
 * 登录
 * userNo 学号/工号
 * psssword 密码
 */
router.post('/', function(req, res, next) {
    //获取客户端发来的数据
    let body = req.body;
    login.getLogin(body.userNo, body.password).then(data => {
        res.send(data)
    })
});

module.exports = router;

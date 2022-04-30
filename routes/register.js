let express = require('express');
let router = express.Router();

/**
 * 注册
 */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/article/add', (req, res) => {
    res.render('article/add.ejs', {
        user: req.session.user,
        isLogin: req.session.isLogin
    });
})

module.exports = router;
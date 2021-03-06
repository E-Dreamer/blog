const conn = require('../db/index')

const moment = require('moment');

//显示注册页面
const showRegisterPage = (req, res) => {
    res.render('./user/register', {})
}

//显示登入页面
const showLoginPage = (req, res) => {
    res.render('./user/login', {})
}

//请求注册
const reg = (req, res) => {

    const body = req.body;

    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ status: 501, msg: "请填写完整的表单数据后再注册用户" });
    }

    const sql = 'select count(*) as count from user where username=?'

    conn.query(sql, body.username, (err, result) => {
        if (err) return res.send({ msg: '用户查重失败！', status: 502 })
        if (result[0].count !== 0) return res.send({ msg: '请更换其他用户名后重新注册', status: 503 });
    })

    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

    const sql1 = 'insert into user set ?';

    conn.query(sql1, body, (err, result) => {
        if (err) return res.send({ msg: '注册新用户失败！', status: 504 })

        if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })

        res.send({ msg: '注册新用户成功！', status: 200 })
    })
}

//请求登入
const log = (req, res) => {

    const body = req.body;

    const sql = 'select * from user where username=? and password=?';

    conn.query(sql, [body.username, body.password], (err, result) => {

        //这是sql语句查询失败了显示
        if (err) return res.send({ status: 500, msg: '用户登入失败' });

        //这是数据错误
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 502 })

        //把 登录成功之后的用户信息 挂在到session上
        // console.log(result);//result中就是用户所有的信息
        req.session.user = result[0];
        //把 用户登录成功之后的结果 挂在到session 上
        req.session.isLogin = true;
        // console.log(req.session);    
        res.send({ status: 200, msg: "登入成功" });
    })
}

//注销
const logout = (req, res) => {
    req.session.destroy(function(err) {
        if (err) throw err;
        console.log('用户退出成功！');
        // 实现服务器端的跳转，这个对比于 客户端跳转
        res.redirect('/');
    });
}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    log,
    logout
}
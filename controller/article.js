const conn = require('../db/index')

const moment = require('moment');

const marked = require('marked');

const showAdd = (req, res) => {
    //如果用户没有登入 则不允许访问文章添加页
    if (!req.session.isLogin) {
        return res.redirect('/')
    }
    res.render('article/add.ejs', {
        user: req.session.user,
        isLogin: req.session.isLogin
    });
}

//添加新文章
const Addarticle = (req, res) => {

    const body = req.body;

    //如果在服务器端获取作者的id 会出错 如果文章编写了很长时间 session会失效
    // body.authorId = req.session.user;

    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');

    const sql = 'insert into article set ?';

    conn.query(sql, body, (err, result) => {

        if (err) return res.send({ status: 500, msg: '添加失败' });

        if (result.affectedRows !== 1) return res.send({ msg: '发表文章失败！', status: 501 })

        res.send({ msg: '发表文章成功！', status: 200, insertId: result.insertId })
    });

}


const showArticlePage = (req, res) => {
    // console.log(req.params);
    const id = req.params.id;

    const sql = 'select * from article where id=?';

    conn.query(sql, id, (err, result) => {
        if (err) return res.send({ status: 500, msg: '获取文章详情失败' })
            // console.log(result);
        if (result.length !== 1) return res.redirect('/')

        const html = marked(result[0].content)
        result[0].content = html
            //在调用res.render()方法之前 要先把markdone文本转成html文本
        res.render('./article/info.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin,
            article: result[0]
        })
    })
}


const showEditPage = (req, res) => {
    if (!req.session.isLogin) return res.redirect('/');

    const id = req.params.id;

    const sql = 'select * from article where id=?';

    conn.query(sql, id, (err, result) => {

        if (err) return res.redirect('/');

        if (result.length !== 1) return res.redirect('/');

        res.render('./article/edit.ejs', { user: req.session.user, isLogin: req.session.isLogin, article: result[0] })
    })
}

const UpdateArticle = (req, res) => {

    const body = req.body;

    const sql = 'update article set ? where id=?'

    conn.query(sql, [body, body.id], (err, result) => {

        if (err) return res.send({ status: 500, msg: "编辑失败" })

        if (result.affectedRows !== 1) return res.send({ msg: '修改文章失败！', status: 502 })

        res.send({ msg: 'ok', status: 200 })

    })
}

module.exports = {
    showAdd,
    Addarticle,
    showArticlePage,
    showEditPage,
    UpdateArticle
}
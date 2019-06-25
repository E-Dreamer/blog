const conn = require('../db/index.js');

const showIndexPage = (req, res) => {

    const pagesize = 3

    const nowpage = Number(req.query.page) || 1

    const sql = `select article.id, article.title, article.ctime, user.nickname 
    from article 
    LEFT JOIN user 
    ON article.authorId=user.id
    ORDER BY article.id desc limit ${(nowpage - 1) * pagesize}, ${pagesize};
    select count(*) as count from article`;

    conn.query(sql, (err, result) => {
        if (err) {

            return res.render('index.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                // 文章列表
                articles: []
            })
        }

        // 总页数
        const totalPage = Math.ceil(result[1][0].count / pagesize)

        res.render('index.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin,
            articles: result[0],
            // 总页数
            totalPage: totalPage,
            // 当前展示的是第几页
            nowpage: nowpage
        })
    })
}

module.exports = {
    showIndexPage
}
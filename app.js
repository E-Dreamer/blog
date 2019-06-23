const express = require('express')
const app = express()

const bodyParser = require('body-parser')


// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')

app.use('/node_modules', express.static('node_modules'))

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', {})
})

app.get('/register', (req, res) => {
    res.render('./user/register', {})
})

app.get('/login', (req, res) => {
    res.render('./user/login', {})
})

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send({ status: 200, msg: 'ok' });
})

app.listen(80, () => {
    console.log("服务器运行成功……")
})
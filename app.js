const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs');

// 设置模板页面的存放路径
app.set('views', './views');

app.use('/node_modules', express.static('node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));

// const router1 = require('./router/index')
// app.use(router1);

// const router2 = require('./router/user')
// app.use(router2);

//使用循环的方式。进行路由的自动注册
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
    if (err) return console.log('目录读取失败');

    filenames.forEach(fname => {
        const router = require(path.join(__dirname, './router', fname));
        app.use(router);
    })
})

app.listen(80, () => {
    console.log("服务器运行成功……")
})
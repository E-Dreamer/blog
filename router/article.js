const express = require('express');

const router = express.Router();

const ctrl = require('../controller/article')

router.get('/article/add', ctrl.showAdd)

router.post('/article/add', ctrl.Addarticle)

router.get('/article/info/:id', ctrl.showArticlePage)

router.get('/article/edit/:id', ctrl.showEditPage)

router.post('/article/edit', ctrl.UpdateArticle)

module.exports = router;
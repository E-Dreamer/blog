const express = require('express')

const router = express.Router();

const ctrl = require('../controller/user')

router.get('/register', ctrl.showRegisterPage)

router.get('/login', ctrl.showLoginPage)

router.post('/register', ctrl.reg)

router.post('/login', ctrl.log)

router.get('/logout', ctrl.logout)

module.exports = router;
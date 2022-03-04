const express = require('express')
const router = express.Router()
const loginCTRL = require('./../controller/loginCTRL')


router.post('/', loginCTRL.login_user)

module.exports = router
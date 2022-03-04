const express = require('express')
const router = express.Router()
const registerCTRL = require('./../controller/registerCTRL')


router.post('/', registerCTRL.register)

module.exports = router

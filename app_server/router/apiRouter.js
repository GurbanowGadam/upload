const express = require('express')
const router = express.Router()
const apiCTRL = require('./../controller/apiCTRL')

router.get('/:lang', apiCTRL.home)
router.get('/:lang/about-us', apiCTRL.about)
router.get('/:lang/:category', apiCTRL.category)
router.get('/:lang/:category/:sub_category', apiCTRL.sub_category)

module.exports = router
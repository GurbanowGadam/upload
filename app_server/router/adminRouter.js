const express = require('express')
const router = express.Router()
const adminCTRL = require('./../controller/adminCTRL')
const mimeTypeCheck = require('./../middleware/mimeTypeCheck')

router.post('/login', adminCTRL.login)

//-------------------languages------------------
router.get('/get-languages', adminCTRL.get_language)
router.get('/get-languages/:id', adminCTRL.get_language_id)
router.post('/add-languages', adminCTRL.add_language)
router.post('/save-languages', adminCTRL.save_language)
router.post('/delete-languages', adminCTRL.delete_language)

//-------------------about----------------------
router.get('/get-about', adminCTRL.get_about)
router.get('/get-about/:id', adminCTRL.get_about_id)
router.post('/save-about', adminCTRL.save_about)
router.post('/video',mimeTypeCheck.mimetype, adminCTRL.video)



module.exports = router
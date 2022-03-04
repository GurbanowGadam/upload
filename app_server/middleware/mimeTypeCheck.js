const mimetype = async(req, res, next) =>{
    try {
        const video = req.files.video
        const rgx = new RegExp('video', 'ig')
        const result = rgx.exec(video.mimetype)
        if (result) {
            next()
        } else {
            res.status(401).json({ "msg:": "Please video upload" })
        }
    } catch (err) {
        res.status(500).json({ "msg:": err })
    }
}

module.exports = {
    mimetype
}
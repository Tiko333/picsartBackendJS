const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/photos/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            callback(null, true)
        }else {
            callback(new Error('only jpeg and png file supported'), false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = upload;
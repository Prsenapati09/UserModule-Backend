const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const upload = require('../middleware/upload.middleware')

const controller = require('../controller/image.controller')

router.post('/image',auth,admin,upload.single('image'),controller.uploadImage)

module.exports = router
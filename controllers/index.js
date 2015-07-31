var router = require('express').Router()
var bodyParser = require('body-parser')

router.use(bodyParser.json())

router.use(require('../auth'))
router.use('/', require('./static'))
router.use('/api/posts', require('./api/posts'))
router.use('/api/sessions', require('./api/sessions'))
router.use('/api/users', require('./api/users'))

module.exports = router
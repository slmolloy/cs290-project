var router = require('express').Router()
var bodyParser = require('body-parser')

router.use(bodyParser.json())

router.use('/', require('./static'))
router.use('/api/exercises', require('./api/exercises'))

module.exports = router
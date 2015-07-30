var express = require('express')
var bodyParser = require('body-parser')
var websockets = require('./websockets')

var app = express()
app.use(bodyParser.json())
app.use(require('./auth'))
app.use('/', require('./controllers/static'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))

var port = process.env.PORT || 3000
var server = app.listen(port, function() {
  console.log('Server listening on', port)
})

websockets.connect(server)
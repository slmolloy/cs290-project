var jwt = require('jwt-simple')
var config = require('./config')

module.exports = function(req, res, next) {
  console.log('Authorization:', req.headers.authorization)
  if (req.headers.authorization) {
    var autharr = req.headers.authorization.split(" ")
    if (autharr.length === 2) {
      req.auth = jwt.decode(autharr[1], config.secret)
    }
  }
  next()
}

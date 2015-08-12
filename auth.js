var jwt = require('jwt-simple')
var config = require('./config')

module.exports = function(req, res, next) {
  if (req.headers.authorization) {
    var autharr = req.headers.authorization.split(" ")
    if (autharr.length === 2) {
      req.auth = jwt.decode(autharr[1], config.secret)
    }
  }
  next()
}

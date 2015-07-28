var router = require('express').Router()
var User = require('../../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../../config')

router.post('/', function(req, res, next) {
  User.findOne({username: req.body.username})
  .select('password').select('username').select('token')
  .exec(function(err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.sendStatus(401) }
      res.json({
        type: true,
        data: {_id: user._id, username: user.username},
        token: user.token
      })
    })
  })
})

module.exports = router

var Exercise = require('../../models/exercise')
var db = require('../../db')
var router = require('express').Router()
var pubsub = require('../../pubsub')
var websockets = require('../../websockets')

router.get('/', function (req, res, next) {
  Exercise.find()
  .sort('-date')
  .exec(function(err, exercises) {
    if (err) { return next(err) }
    res.json(exercises)
  })
})

router.post('/', function(req, res, next) {
  var post = new Exercise({
    name: req.body.name,
    reps: req.body.reps,
    weight: req.body.weight,
    date: Date.now(),
    units: req.body.units
  })
  post.save(function(err, exercise) {
    if (err) { return next(err) }
    pubsub.publish('new_post', exercise)
    res.status(201).json(exercise)
  })
})

router.delete('/:id', function(req, res, next) {
  var exerciseid = db.toObjectId(req.params.id)
  Exercise.find({_id: exerciseid}).remove(function(err) {
    if (err) { return next(err) }
    pubsub.publish('delete_post', exerciseid)
    res.sendStatus(200)
  })
})

pubsub.subscribe('new_post', function(exercise) {
  websockets.broadcast('new_post', exercise)
})

pubsub.subscribe('delete_post', function(exerciseid) {
  websockets.broadcast('delete_post', exerciseid)
})

module.exports = router

//var Exercise = require('../../models/exercise')
var db = require('../../db')
var router = require('express').Router()
var pubsub = require('../../pubsub')
var websockets = require('../../websockets')

router.get('/', function (req, res, next) {
  console.log('getting workouts');
  db.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.json(rows);
  });
  // Exercise.find()
  // .sort('-date')
  // .exec(function(err, exercises) {
  //   if (err) { return next(err) }
  //   res.json(exercises)
  // })
});

router.post('/', function(req, res, next) {
  var exercise = new Exercise({
    name: req.body.name,
    reps: req.body.reps,
    weight: req.body.weight,
    date: Date.now(),
    units: req.body.units
  })
  exercise.save(function(err, exercise) {
    if (err) { return next(err) }
    pubsub.publish('new_exercise', exercise)
    res.status(201).json(exercise)
  })
})

router.delete('/:id', function(req, res, next) {
  var exerciseid = db.toObjectId(req.params.id)
  Exercise.find({_id: exerciseid}).remove(function(err) {
    if (err) { return next(err) }
    pubsub.publish('delete_exercise', exerciseid)
    res.sendStatus(200)
  })
})

pubsub.subscribe('new_exercise', function(exercise) {
  websockets.broadcast('new_exercise', exercise)
})

pubsub.subscribe('delete_exercise', function(exerciseid) {
  websockets.broadcast('delete_exercise', exerciseid)
})

module.exports = router

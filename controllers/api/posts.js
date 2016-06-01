var Post = require('../../models/post')
var db = require('../../db')
var router = require('express').Router()
var pubsub = require('../../pubsub')
var websockets = require('../../websockets')

router.get('/', function (req, res, next) {
  Post.find()
  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

router.post('/', function(req, res, next) {
  var post = new Post({
    name: req.body.name,
    reps: req.body.reps,
    weight: req.body.weight,
    date: Date.now(),
    units: req.body.units
  })
  post.save(function(err, post) {
    if (err) { return next(err) }
    pubsub.publish('new_post', post)
    res.status(201).json(post)
  })
})

router.delete('/:id', function(req, res, next) {
  var postid = db.toObjectId(req.params.id)
  Post.find({_id: postid}).remove(function(err) {
    if (err) { return next(err) }
    pubsub.publish('delete_post', postid)
    res.sendStatus(200)
  })
})

pubsub.subscribe('new_post', function(post) {
  websockets.broadcast('new_post', post)
})

pubsub.subscribe('delete_post', function(postid) {
  websockets.broadcast('delete_post', postid)
})

module.exports = router

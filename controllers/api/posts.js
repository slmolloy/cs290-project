var Post = require('../../models/post')
var db = require('../../db')
var router = require('express').Router()
var pubsub = require('../../pubsub')
var websockets = require('../../websockets')
var eventEmitter = websockets.eventEmitter

router.get('/', function (req, res, next) {
  Post.find()
  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

router.post('/', function(req, res, next) {
  var post = new Post({body: req.body.body})
  post.username = req.auth.username
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

pubsub.subscribe('markviewed_post', function(post) {
  websockets.broadcast('markviewed_post', post)
})

pubsub.subscribe('marknotviewed_post', function(post) {
  websockets.broadcast('marknotviewed_post', post)
})

eventEmitter.on('ws:viewed_post', function(data) {
  Post.find({_id: db.toObjectId(data)})
  .exec(function(err, posts) {
    if (err) { return next(err) }
    posts[0].viewed = true
    posts[0].save(function(err, post) {
      if (err) { return next(err) }
      pubsub.publish('markviewed_post', post)
    })
  })
})

eventEmitter.on('ws:notviewed_post', function(data) {
  Post.find({_id: db.toObjectId(data)})
  .exec(function(err, posts) {
    if (err) { return next(err) }
    posts[0].viewed = false
    posts[0].save(function(err, post) {
      if (err) { return next(err) }
      pubsub.publish('marknotviewed_post', post)
    })
  })
})

module.exports = router

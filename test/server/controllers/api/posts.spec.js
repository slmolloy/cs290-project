/* jshint expr: true */

var expect = require('chai').expect
var postsctrl = require('../../../../controllers/api/posts')

var api = require('../../support/api')
var Post = require('../../../../models/post')
var user = require('../../support/user')

describe('controllers.api.posts', function() {
  beforeEach(function(done) {
    Post.remove({}, done)
  })
  describe('GET /api/posts', function() {
    var token
    var body = 'some new message'

    beforeEach(function(done) {
      user.create('scott', 'pass', function(err, user) {
        token = user.token
        done(err)
      })
    })

    beforeEach(function(done) {
      api.post('/api/posts')
        .send({body: body})
        .set('authorization', 'Bearer ' + token)
        .expect(201)
        .end(done)
    })

    it('added 1 new post', function(done) {
        Post.findOne(function(err, post) {
          expect(post.body).to.equal(body)
          done(err)
        })
      })

    /*beforeEach(function(done) {
      var posts = [
        {body: 'post1', username: 'slmolloy'},
        {body: 'post2', username: 'slmolloy'},
        {body: 'post3', username: 'slmolloy'}
      ]
      Post.create(posts, done)
    })*/

    it('posts api exists and returns 200', function(done) {
      api.get('/api/posts')
        .expect(200)
        .end(done)
    })

    /*it('has 3 posts', function(done) {
      api.get('/api/posts')
        .expect(200)
        .expect(function(posts) {
          if (posts.body.length !== 3) {
            return 'posts count should be 3'
          }
        })
        .end(done)
    })*/
  })
  describe('controllers exists', function() {
    it('support api exists', function() {
      expect(api).to.exist
    })
    it('posts ctrl exists', function() {
      expect(postsctrl).to.exist
    })
  })
})
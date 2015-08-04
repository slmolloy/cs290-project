/* jshint expr: true */

describe('posts.svc', function() {
  beforeEach(module('app'))
  var PostsSvc, $httpBackend

  beforeEach(inject(function(_PostsSvc_, _$httpBackend_) {
    PostsSvc = _PostsSvc_
    $httpBackend = _$httpBackend_
  }))

  afterEach(function() {
    $httpBackend.flush()
  })

  describe('#fetch', function() {
    beforeEach(function(){
      $httpBackend.expect('GET', '/api/posts')
        .respond([
          {username: 'slmolloy', body: 'first post'},
          {username: 'slmolloy', body: 'second post'}
        ])
    })

    it('gets 2 posts', function() {
      PostsSvc.fetch().success(function(posts) {
        expect(posts).to.have.length(2)
      })
    })
  })

  describe('#post', function() {
    beforeEach(function() {
      $httpBackend.expect('POST', '/api/posts')
        .respond({username: 'slmolloy', body: 'my new post'})
    })

    it('create post', function() {
      PostsSvc.create({username: 'slmolloy', body: 'my new post'}).success(function(post) {
        expect(post.username).to.equal('slmolloy')
        expect(post.body).to.equal('my new post')
      })
    })
  })
})
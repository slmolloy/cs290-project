angular.module('app')
.service('PostsSvc', function($http, UserSvc) {
  this.fetch = function() {
    return $http.get('/api/posts')
  }
  this.create = function(post) {
    $http.defaults.headers.authorization = 'Bearer ' + UserSvc.token
    return $http.post('/api/posts', post)
  }
  this.remove = function(postid) {
    $http.defaults.headers.authorization = 'Bearer ' + UserSvc.token
    return $http.delete('/api/posts/' + postid.body)
  }
})

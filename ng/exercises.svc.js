angular.module('app')
.service('ExercisesSvc', function($http) {
  this.fetch = function() {
    return $http.get('/api/exercises')
  }
  this.create = function(post) {
    return $http.post('/api/exercises', post)
  }
  this.remove = function(postid) {
    return $http.delete('/api/exercises/' + postid.body)
  }
})

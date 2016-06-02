angular.module('app')
.service('ExercisesSvc', function($http) {
  this.fetch = function() {
    console.log('get exercises')
    return $http.get('/api/exercises')
  }
  this.create = function(exercise) {
    return $http.exercise('/api/exercises', exercise)
  }
  this.remove = function(exerciseid) {
    return $http.delete('/api/exercises/' + exerciseid.body)
  }
})

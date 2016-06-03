angular.module('app')
.service('ExercisesSvc', function($http) {
  this.fetch = function() {
    return $http.get('/api/exercises');
  };
  this.create = function(exercise) {
    return $http.post('/api/exercises', exercise);
  };
  this.remove = function(exerciseid) {
    return $http.delete('/api/exercises/' + exerciseid.body);
  };
  this.update = function(exercise) {
    return $http.put('/api/exercises/' + Number(exercise.id), exercise);
  };
});

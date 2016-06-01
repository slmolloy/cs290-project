angular.module('app')
.config(function($routeProvider) {
  $routeProvider.when('/', { controller: 'ExercisesCtrl', templateUrl: 'exercises.html' })
})

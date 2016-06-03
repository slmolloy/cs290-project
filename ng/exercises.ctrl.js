angular.module('app')
.controller('ExercisesCtrl', function($scope, ExercisesSvc) {
  $scope.addExercise = function() {
    console.log('addExercise');
    if ($scope.name && $scope.reps && $scope.weight && $scope.lbs) {
      console.log('scopes good');
      ExercisesSvc.create({
        name: $scope.name,
        reps: $scope.reps,
        weight: $scope.weight,
        lbs: $scope.lbs
      })
        .then(function() {
          console.log('successful create');
          $scope.name = null
          $scope.reps = null
          $scope.weight = null
          $scope.lbs = null
        })
    }
  }

  ExercisesSvc.fetch()
    .then(function(exercises) {
      $scope.exercises = exercises.data
      console.log($scope.exercises);
    })

  $scope.remove = function(exerciseid) {
    ExercisesSvc.remove({body: exerciseid})
  }

  $scope.$on('ws:new_exercise', function(_, exercise) {
    $scope.$apply(function() {
      $scope.exercises.unshift(exercise)
    })
  })

  $scope.$on('ws:delete_exercise', function(_, exerciseid) {
    $scope.$apply(function() {
      $scope.exercises.forEach(function(p, i) {
        if (exerciseid === p._id) {
          $scope.exercises.splice(i, 1)
        }
      })
    })
  })
})

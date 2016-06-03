angular.module('app')
.controller('ExercisesCtrl', function($scope, ExercisesSvc) {
  $scope.lbs = 1;
  $scope.selected = {};

  $scope.addExercise = function() {
    if ($scope.newExercise.$valid) {
      ExercisesSvc.create({
        name: $scope.name,
        reps: $scope.reps,
        weight: $scope.weight,
        lbs: $scope.lbs
      })
        .then(function() {
          $scope.name = null;
          $scope.reps = null;
          $scope.weight = null;
          $scope.lbs = 1;
        });
    }
  };

  ExercisesSvc.fetch()
    .then(function(exercises) {
      $scope.exercises = exercises.data;
    });

  $scope.remove = function(exercise) {
    ExercisesSvc.remove({body: exercise.id});
  };

  $scope.edit = function(exercise) {
    $scope.selected = angular.copy(exercise);
  };

  $scope.cancel = function() {
    $scope.selected = {};
  };

  $scope.save = function(exercise) {
    ExercisesSvc.update($scope.selected);
    $scope.exercises.forEach(function(p, i) {
      if ($scope.selected.id === p.id) {
        $scope.exercises[i] = angular.copy($scope.selected);
      }
    });
    $scope.cancel();
  };

  $scope.getTemplate = function(exercise) {
    if (exercise.id === $scope.selected.id) {
      return 'edit';
    } else {
      return 'view';
    }
  };

  $scope.$on('ws:new_exercise', function(_, exercise) {
    $scope.$apply(function() {
      $scope.exercises.unshift(exercise);
    });
  });

  $scope.$on('ws:delete_exercise', function(_, exerciseid) {
    $scope.$apply(function() {
      $scope.exercises.forEach(function(p, i) {
        if (Number(exerciseid) === p.id) {
          $scope.exercises.splice(i, 1);
        }
      });
    });
  });
});

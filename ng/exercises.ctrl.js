angular.module('app')
.controller('ExercisesCtrl', function($scope, ExercisesSvc) {
  $scope.addPost = function() {
    if ($scope.name && $scope.reps && $scope.weight && $scope.units) {
      ExercisesSvc.create({
        name: $scope.name,
        reps: $scope.reps,
        weight: $scope.weight,
        units: $scope.units
      })
        .then(function() {
          $scope.name = null
          $scope.reps = null
          $scope.weight = null
          $scope.units = null
        })
    }
  }

  ExercisesSvc.fetch()
    .then(function(posts) {
      $scope.posts = posts.data
    })

  $scope.remove = function(exerciseid) {
    ExercisesSvc.remove({body: exerciseid})
  }

  $scope.$on('ws:new_post', function(_, post) {
    $scope.$apply(function() {
      $scope.posts.unshift(post)
    })
  })

  $scope.$on('ws:delete_post', function(_, exerciseid) {
    $scope.$apply(function() {
      $scope.posts.forEach(function(p, i) {
        if (exerciseid === p._id) {
          $scope.posts.splice(i, 1)
        }
      })
    })
  })
})

angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc) {
  $scope.addPost = function() {
    if ($scope.name && $scope.reps && $scope.weight && $scope.units) {
      PostsSvc.create({
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

  PostsSvc.fetch()
    .then(function(posts) {
      $scope.posts = posts.data
    })

  $scope.remove = function(postid) {
    PostsSvc.remove({body: postid})
  }

  $scope.$on('ws:new_post', function(_, post) {
    $scope.$apply(function() {
      $scope.posts.unshift(post)
    })
  })

  $scope.$on('ws:delete_post', function(_, postid) {
    $scope.$apply(function() {
      $scope.posts.forEach(function(p, i) {
        if (postid === p._id) {
          $scope.posts.splice(i, 1)
        }
      })
    })
  })
})

angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc, WebSocketSvc) {
  $scope.addPost = function() {
    if ($scope.postBody) {
      PostsSvc.create({body: $scope.postBody})
      .success(function(post) {
        //$scope.posts.unshift(post)
        $scope.postBody = null
      })
    }
  }

  $scope.$on('ws:new_post', function(_, post) {
    $scope.$apply(function() {
      $scope.posts.unshift(post)
    })
  })

  PostsSvc.fetch()
    .success(function(posts) {
      $scope.posts = posts
    })
})

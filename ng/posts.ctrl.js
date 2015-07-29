angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc, WebSocketSvc) {
  $scope.addPost = function() {
    if ($scope.postBody) {
      PostsSvc.create({body: $scope.postBody})
      .success(function(post) {
        $scope.postBody = null
      })
    }
  }

  $scope.markViewed = function(postid) {
    WebSocketSvc.send('viewed_post', postid)
  }

  $scope.markNotViewed = function(postid) {
    WebSocketSvc.send('notviewed_post', postid)
  }

  $scope.$on('ws:new_post', function(_, post) {
    $scope.$apply(function() {
      $scope.posts.unshift(post)
    })
  })

  $scope.$on('ws:markviewed_post', function(_, post) {
    $scope.$apply(function() {
      $scope.posts.forEach(function(p) {
        if (post._id === p._id) {
          p.viewed = true
        }
      })
    })
  })

  $scope.$on('ws:marknotviewed_post', function(_, post) {
    $scope.$apply(function() {
      $scope.posts.forEach(function(p) {
        if (post._id === p._id) {
          p.viewed = false
        }
      })
    })
  })

  PostsSvc.fetch()
    .success(function(posts) {
      $scope.posts = posts
    })
})

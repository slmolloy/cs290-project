angular.module('app')
.controller('PostsCtrl', function($scope, PostsSvc, WebSocketSvc) {
  $scope.addPost = function() {
    if ($scope.postBody) {
      PostsSvc.create({body: $scope.postBody})
        .then(function() {
          $scope.postBody = null
        })
    }
  }

  PostsSvc.fetch()
    .then(function(posts) {
      $scope.posts = posts
    })

  $scope.remove = function(postid) {
    PostsSvc.remove({body: postid})
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

  $scope.$on('ws:delete_post', function(_, postid) {
    $scope.$apply(function() {
      $scope.posts.forEach(function(p, i) {
        if (postid === p._id) {
          $scope.posts.splice(i, 1)
        }
      })
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
})

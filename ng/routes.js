angular.module('app')
.config(function($routeProvider, $httpProvider) {
  $routeProvider.when('/', { controller: 'PostsCtrl', templateUrl: 'posts.html' })
})

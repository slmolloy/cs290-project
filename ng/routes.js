angular.module('app')
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', { controller: 'PostsCtrl', templateUrl: 'posts.html' })
  .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
  .when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' })
  .when('/logout', { controller: 'LogoutCtrl', templateUrl: 'login.html' })
  $httpProvider.interceptors.push('AuthInterceptor')
})

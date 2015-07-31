angular.module('app')
.controller('ApplicationCtrl', function($scope, $window, UserSvc) {
  $scope.$on('login', function(_, user) {
    $scope.currentUser = user
  })
  $scope.$on('logout', function(_) {
    delete $scope.currentUser
    UserSvc.logout()
  })

  $scope.hasCurrentUser = function () {
    var token = $window.localStorage.getItem('token')
    var user = JSON.parse($window.localStorage.getItem('user'))
    if (token === null || user === null) {
      delete $scope.currentUser
      return false
    } else {
      $scope.currentUser = JSON.parse($window.localStorage.user)
      return true
    }
  }
})
/*.run(function($rootScope, $window, UserSvc, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    var token = $window.localStorage.token
    var user = $window.localStorage.user
    if (token === "null" || user === "null") {
      $location.path('/login').replace()
      console.log('Not logged in')
    } else {
      UserSvc.setstate(token, user)
      //$scope.currentUser = JSON.parse(user)
      $rootScope.currentUser = JSON.parse(user)
    }
  })
})*/
angular.module('app')
.controller('ApplicationCtrl', function($scope) {
  $scope.$on('login', function(_, user) {
    $scope.currentUser = user
  })
  $scope.$on('logout', function(_) {
    $scope.currentUser = null
  })
})

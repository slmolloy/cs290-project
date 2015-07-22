angular.module('app')
.controller('LogoutCtrl', function($scope, UserSvc, $location) {
  $scope.$emit('logout')
  $location.path('/login').replace()
})

angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc, $location) {
  $scope.register = function(username, password) {
    UserSvc.register(username, password)
    .then(function(response) {
      $location.path('/').replace()
    })
  }
})


angular.module('app')
.controller('LoginCtrl', function($scope, UserSvc) {
  $scope.login = function(username, password) {
    UserSvc.login(username, password)
    .then(function(response) {
      $scope.$emit('login', response.data)
      // TODO: emit then redirect to post page
    })
  }
})

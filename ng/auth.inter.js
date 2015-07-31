angular.module('app')
.factory('AuthInterceptor', function($window, $q, $location) {
  return {
    request: function(config) {
      config.headers = config.headers || {}
      var token = $window.localStorage.getItem('token')
      if (token === null) {
        delete config.headers.authorization
      } else {
        config.headers.authorization = 'Bearer ' + token
      }
      return config || $q.when(config)
    },
    response: function(response) {
      if (response.status === 401) {
        //$location.path('/login').replace()
      }
      return response || $q.when(config)
    }
  }
})
angular.module('app')
.service('UserSvc', function($http, $window) {
  var svc = this
  svc.getUser = function() {
    return $http.get('/api/users')
  }

  svc.login = function(username, password) {
    delete $http.defaults.headers.authorization
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function(val) {
      svc.token = val.data.token
      svc.user = val.data.data
      svc.setstate(svc.token, svc.user)
      return val.data.data
    })
  }

  svc.setstate = function(token, user) {
    $http.defaults.headers.authorization = 'Bearer ' + token
    $window.localStorage.setItem('token', token)
    $window.localStorage.setItem('user', JSON.stringify(user))
  }

  svc.logout = function() {
    $window.localStorage.removeItem('token')
    $window.localStorage.removeItem('user')
  }

  svc.register = function(username, password) {
    return $http.post('/api/users', {
      username: username, password: password
    }).then(function(val) {
      return svc.login(username, password)
    })
  }
})

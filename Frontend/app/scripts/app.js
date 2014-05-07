'use strict';

angular
  .module('quienPagaApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'googlechart.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/About', {
        templateUrl: 'views/About.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

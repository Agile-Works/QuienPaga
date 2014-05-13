'use strict';

angular
  .module('quienPagaApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'googlechart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/DataByPoliticalParty', {
        templateUrl: 'views/DetallePartidoOrigen.html',
        controller: 'Nivel2Ctrl',
      })
      .when('/About', {
        templateUrl: 'views/About.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

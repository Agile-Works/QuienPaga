'use strict';

angular
  .module('quienPagaApp', [
    //'ngCookies',
    //'ngResource',
    //'ngSanitize',
    'ui.router',
    'googlechart'
  ])
  .config(function ($stateProvider,$urlRouterProvider) {
 
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('todos', {
        url:'/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('partido', {
        url:'/partido/:id',
        templateUrl: 'views/partido.html',
        controller: 'PorPartidoCtrl'
      })
      .state('origen', {
        url:'/origen/:id/:type',
        templateUrl: 'views/origen.html',
        controller: 'PorOrigenCtrl'
      });
  });

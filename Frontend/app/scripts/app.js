'use strict';

angular
  .module('quienPagaApp', [
    'templates-main',
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
      })
      .state('contribuyente', {
        url:'/contribuyente/:nombre',
        templateUrl: 'views/contribuyente.html',
        controller: 'PorContribuyenteCtrl'
      });
  });

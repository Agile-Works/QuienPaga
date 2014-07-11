'use strict';

angular
  .module('quienPagaApp', [
    'templates-main',
    'ui.router',
    'googlechart',
    'ui.select2',
  ])
  .config(function ($stateProvider) {
 
    //$urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });

angular.module('quienPagaApp').run(['uiSelect2Config', function(uiSelect2Config) {
  uiSelect2Config.allowClear = true;
  
}]);
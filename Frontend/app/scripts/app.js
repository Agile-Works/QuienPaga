'use strict';

angular
  .module('quienPagaApp', [
    'templates-main',
    
    'googlechart',
    'ui.select2',
    'ngGrid'
  ]);
 /* .config(function ($stateProvider) {
 
    //$urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });*/

/*.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  });*/

angular.module('quienPagaApp').run(['uiSelect2Config', function(uiSelect2Config) {
  uiSelect2Config.allowClear = true;
  uiSelect2Config.formatResult= function(option){
    var ret=option.text;
    switch(angular.lowercase(option.text)){
      case 'frente amplio':
        ret='<b>' + option.text + '</b>';
        break;
      case 'partido nacional':
        ret='<b>' + option.text + '</b>';
        break;
      case 'asamblea popular':
        ret='<b>' + option.text + '</b>';
        break;
      case 'partido colorado':
        ret='<b>' + option.text + '</b>';
        break;
      case 'partido independiente':
        ret='<b>' + option.text + '</b>';
        break;
      case 'público':
        ret='<b>' + option.text + '</b>';
        break;
      case 'privado':
        ret='<b>' + option.text + '</b>';
        break;
      default:
        ret='&nbsp' + option.text;
    }
    return ret;
  };
  
}]);
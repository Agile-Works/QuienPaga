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
        if ( option.text !=='') {
          ret='&nbsp;&nbsp;&nbsp;' + option.text;
        }
        break;
    }
    return ret;
  };

  uiSelect2Config.formatSelection= function(option,container){
    console.log(container.context.attributes.id.value);

    if (angular.isDefined(container.context.attributes.id.value)){
      var ret='';
      var stylefront='<span style="color:#7D1634; font-weight:900;font-size: 16px;">';
      var styleback='</span>';
      console.log(container.context.attributes.id.value);
      switch(container.context.attributes.id.value){
        case 's2id_SelectPartidoSector':
          console.log(document.getElementById(option.text.replace(' ','_')));
          if ((option.text ==='' ||option.text ===null) && document.getElementById('filtropartido').getAttribute('value') !==''){
            ret=stylefront + document.getElementById('filtropartido').getAttribute('value') + styleback;
          }else if((option.text ==='' ||option.text ===null) && document.getElementById('filtrosector').getAttribute('value') !==''){
            console.log(document.getElementById('filtrosector').getAttribute('value'));
            ret=stylefront + document.getElementById('filtrosector').getAttribute('value') + styleback;
          }else if (document.getElementById(option.text.replace(' ','_'))!==null && document.getElementById(option.text.replace(' ','_')).getAttribute('partido')==='false'){
            ret=stylefront + document.getElementById(option.text.replace(' ','_')).getAttribute('parent') + ' - ' + option.text + styleback;
          }else{
            ret=stylefront + option.text + styleback;
          }
          break;
        case 's2id_SelectJurisdiccion':
          if (option.text ==='' && document.getElementById('filtrojurisdiccion').getAttribute('value') !==''){
            ret=stylefront + document.getElementById('filtrojurisdiccion').getAttribute('value') + styleback;
          }else{
            ret= stylefront+ option.text + styleback;
          }
          break;
        case 's2id_SelectOrigenConcepto':

          if (option.text ==='' && document.getElementById('filtroorigen').getAttribute('value') !==''){
            ret=stylefront + document.getElementById('filtroorigen').getAttribute('value') + styleback;
          }else if(option.text ==='' && document.getElementById('filtroconcepto').getAttribute('value') !==''){
            ret=stylefront + document.getElementById('filtroconcepto').getAttribute('value') + styleback;
          }else if (document.getElementById(option.text.replace(' ','_'))!==null  && document.getElementById(option.text.replace(' ','_')).getAttribute('origen')==='false'){
            ret=stylefront + 'Origen ' + document.getElementById(option.text.replace(' ','_')).getAttribute('parent') + ' - ' + option.text + styleback;
          }else{
            ret=stylefront + 'Origen ' + option.text + styleback;
          }
          break;
        case 's2id_SelectDonante':
          if (option.text ==='' && document.getElementById('filtrodonante').getAttribute('value') !==''){
            ret=stylefront + document.getElementById('filtrodonante').getAttribute('value') + styleback;
          }else{
            ret= stylefront+ option.text + styleback;
          }
          break;
        case 's2id_SelectGroupBy':
          ret= stylefront+ 'Agrupar por ' + option.text + styleback;
          break;
      }
      return ret;
    }else{
      return option.text;
    }
  };
  
}]);
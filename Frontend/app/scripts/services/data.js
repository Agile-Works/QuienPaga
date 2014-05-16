'use strict';

angular.module('quienPagaApp')
  .service('DataService', function($http) {
  var Api_Url='http://sudestadaapi.agileworks.net/api/Main/';

    this.GetAll = function() {
      return $http.get(Api_Url + 'Index')
        .then(function(response){
          return response.data;
        });
    };

    this.GetOriginFor= function(partido) {
      return $http.get(Api_Url + 'RenderByOrigen?partido=' + partido)
        .then(function(response){
          return response.data;
        });
    };

    this.GetDetailForOrigin= function(partido,origen) {
      return $http.get(Api_Url + 'RenderByDetail?partido='+partido + '&origen=' + origen)
        .then(function(response){
          return response.data;
        });
    };

  });
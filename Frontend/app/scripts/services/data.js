'use strict';

angular.module('quienPagaApp')
  .service('DataService', function($http) {
    this.GetAll = function() {
      return $http.get('http://www.quienpaga.local/api/Main/Index')
        .then(function(response){
          return response.data;
        });
    };

    this.GetOriginFor= function(partido) {
      return $http.get('http://www.quienpaga.local/api/Main/RenderByOrigen?partido=' + partido)
        .then(function(response){
          return response.data;
        });
    };

    this.GetDetailForOrigin= function(partido,origen) {
      return $http.get('http://www.quienpaga.local/api/Main/RenderByDetail?partido='+partido + '&origen=' + origen)
        .then(function(response){
          return response.data;
        });
    };

  });
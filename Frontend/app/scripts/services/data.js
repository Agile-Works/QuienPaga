'use strict';

angular.module('quienPagaApp')
  .service('DataService', function($http) {
  var ApiUrl='http://sudestadaapi.agileworks.net/api/Main/';

  this.GetAll = function() {
    return $http.get(ApiUrl + 'Index')
      .then(function(response){
        return response.data;
      });
  };

  this.GetOriginFor= function(partido) {
    return $http.get(ApiUrl + 'RenderByOrigen?partido=' + partido)
      .then(function(response){
        return response.data;
      });
  };

  this.GetDetailForOrigin= function(partido,origen) {
    return $http.get(ApiUrl + 'RenderByDetail?partido='+partido + '&origen=' + origen)
      .then(function(response){
        return response.data;
      });
  };

});
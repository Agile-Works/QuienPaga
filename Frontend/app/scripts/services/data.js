'use strict';

angular.module('quienPagaApp')
  .service('DataService', function($http) {
  var ApiUrl='http://sudestadaapi.agileworks.net/api/Main/';//'http://www.quienpaga.local/api/Main/';  
  var select2Data=[];

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

  this.GetDetailForContributor= function(contribuyente) {
    return $http.get(ApiUrl + 'RenderByPerson?person='+contribuyente)
      .then(function(response){
        return response.data;
      });
  };

  this.GetSelect2Data=function(){
    if (select2Data.length === 0){
      return $http.get(ApiUrl + 'RenderContributors')
        .then(function(response){
          return response.data;
        });
    }else{
      return select2Data;
    }
  };
  
});
'use strict';

angular.module('quienPagaApp')
  .service('DataService', function($http,$filter) {
  var ApiUrl='http://www.quienpaga.local/api/Main/';
  var select2Data=[];
  var jsonData=[];
  var partidosector=[];
  var origenconcepto=[];
  var donante=[]; /*pares donante partido*/
  var jurisdiccion=[];


  this.GetByPartido = function() {
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

  this.GetFilteredData=function(data){
    jsonData=data;
    $filter('groupBy')(data,'Partido');
    return jsonData;
  };

  this.GetAll=function(){
    if (jsonData.length === 0){
      return $http.get(ApiUrl + 'GetAll')
        .then(function(response){
          //Partido sector
          angular.forEach($filter('groupBy')(response.data,'Partido'), function(value){
            var dato={'name' : value, 'isPartido':'true'};
            partidosector.push(dato);
            angular.forEach($filter('groupBy')($filter('filter')(response.data,{'Partido':value}),'Sector'), function(value2){
              var dato2={'name' : value2, 'isPartido':'false'};
              partidosector.push(dato2);
            });
          });

          //Origen concepto
          angular.forEach($filter('groupBy')(response.data,'Origen'), function(value){
            var dato={'name' : value, 'isOrigen':'true'};
            origenconcepto.push(dato);
            angular.forEach($filter('groupBy')($filter('filter')(response.data,{'Origen':value}),'Concepto'), function(value2){
              var dato2={'name' : value2, 'isOrigen':'false'};
              origenconcepto.push(dato2);
            });
          });

          //Donante
          angular.forEach($filter('groupBy')(response.data,'Donante'), function(value){
            angular.forEach($filter('groupBy')($filter('filter')(response.data,{'Donante':value}),'Partido'), function(value2){
              var dato2={'name' : value, 'Partido':value2};
              donante.push(dato2);
            });
          });

          //Jurisdiccion
          angular.forEach($filter('groupBy')(response.data,'Jurisdiccion'), function(value){
            jurisdiccion.push(value);
          });

          return response.data;
        });
    }else{
      return jsonData;
    }
  };

  
  this.GetSelect2Data=function(){
    if (select2Data.length === 0){
      return $http.get(ApiUrl + 'RenderContributors')
        .then(function(response){
          select2Data=response.data;
          return response.data;
        });
    }else{
      return select2Data;
    }
  };
  
  this.GetSelectors=function(){
    var dato= {'partidosector': partidosector, 'origenconcepto':origenconcepto,'donante':donante,'jurisdiccion':jurisdiccion};
    console.log(dato);
    return dato;
  };

});
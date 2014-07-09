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
  var self = this;

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

  this.CreateDataSelectors= function (response){
    //Partido sector
    angular.forEach($filter('groupBy')(response.data,'Partido'), function(value){
      var dato={'name' : value.Partido, 'isPartido':'true', 'partido':value.Partido};
      partidosector.push(dato);
      angular.forEach($filter('groupBy')($filter('filter')(response.data,{'Partido':value.Partido}),'Sector'), function(value2){
        var dato2={'name' : value2.Sector, 'isPartido':'false',  'partido':value2.Partido};
        partidosector.push(dato2);
      });
    });

    //Origen concepto
    angular.forEach($filter('groupBy')(response.data,'Origen'), function(value){
      var dato={'name' : value.Origen, 'isOrigen':'true', 'origen':value.Origen};
      origenconcepto.push(dato);
      angular.forEach($filter('groupBy')($filter('filter')(response.data,{'Origen':value.Origen}),'Concepto'), function(value2){
        var dato2={'name' : value2.Concepto, 'isOrigen':'false', 'origen':value2.Origen};
        origenconcepto.push(dato2);
      });
    });

    //Donante
    angular.forEach($filter('groupBy')(response.data,'Donante'), function(value){
      angular.forEach($filter('groupBy')($filter('filter')(response.data,{'Donante':value.Donante}),'Partido'), function(value2){
        var dato2={'name' : value2.Donante, 'partido':value2.Partido, 'origen':value2.Origen, 'concepto':value2.Concepto, 'sector':value2.Sector};
        donante.push(dato2);
      });
    });

    //Jurisdiccion
    angular.forEach($filter('groupBy')(response.data,'Jurisdiccion'), function(value){
      jurisdiccion.push(value);
    });
  };

  this.filterData= function(collection,filtro){
    console.log(filtro);
    if (filtro.partido !==''){
      collection= $filter('filter')(collection,{'Partido':filtro.partido});
      console.log(collection);
    }

    if(filtro.sector !==''){
      collection= $filter('filter')(collection,{'Sector':filtro.sector});
      console.log(collection);

    }

    if(filtro.jurisdiccion !==''){
      collection= $filter('filter')(collection,{'Jurisdiccion':filtro.jurisdiccion});
      console.log(collection);

    }

    if(filtro.origen !==''){
      collection= $filter('filter')(collection,{'Origen':filtro.origen});
      console.log(collection);
    }

    if(filtro.concepto !==''){
      collection= $filter('filter')(collection,{'Concepto':filtro.concepto});
      console.log(collection);
    }

    if(filtro.donante !==''){
      collection= $filter('filter')(collection,{'Donante':filtro.donante});
      console.log(collection);
    }

    return collection;
  };

  this.GetAll=function(filtro){
    console.log('fltro');
    if (jsonData.length === 0){
      return $http.get(ApiUrl + 'GetAll')
        .then(function(response){
          self.CreateDataSelectors(response);
          return self.filterData(response.data, filtro);
        });
    }else{
      console.log('entro');
      return self.filterData(jsonData, filtro);

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
    return dato;
  };

});
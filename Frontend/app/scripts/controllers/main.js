'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope,$http) {
    $http.get('http://www.quienpaga.local/api/Main/Index')
      .success(function(response){
        var chartdata= [['Partido', 'Montos']];
        angular.forEach(response, function(value){
          var dato=angular.fromJson(value);
          var aux=[];
          aux.push(dato.Label);
          aux.push(dato.Monto);
          this.push(aux);
        }, chartdata);
        var MainChart = {};
        MainChart.methods={};
        MainChart.type = 'PieChart';
        MainChart.data=chartdata;
        MainChart.options = {displayExactValues: true,width: 400,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}};
        MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
        $scope.chart = MainChart;
      });
   
    $scope.mainData=function(){
      $http.get('http://www.quienpaga.local/api/Main/Index')
        .success(function(data){
          $scope.result= data;
        });
    };

    $scope.DataByPoliticalParty=function(name){
      $http.get('http://www.quienpaga.local/api/Main/RenderByOrigen?partido='+name)
        .success(function(data){
          $scope.result= data;
          var chartdata= [['Origen', 'Montos']];
          angular.forEach(data, function(value){
            var dato=angular.fromJson(value);
            var aux=[];
            aux.push(dato.Label);
            aux.push(dato.Monto);
            this.push(aux);
          }, chartdata);
          var MainChart = {};
          MainChart.methods={};
          MainChart.type = 'PieChart';
          MainChart.data=chartdata;
          MainChart.options = {displayExactValues: true,width: 400,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}};
          MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
          $scope.chart = MainChart;
        });
    };
    
  });
'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope,$http,$window,DataService) {
    DataService.GetAll().then(function(response){
      var chartdata= [['Partido', 'Montos']];
      $scope.result=response;
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
      MainChart.options = {displayExactValues: true,width: 500,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}};
      MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
      $scope.chart = MainChart;
    });
  });
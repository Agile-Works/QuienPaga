'use strict';

angular.module('quienPagaApp')
  .controller('PorOrigenCtrl', function ($scope,$http,$stateParams,DataService) {
    console.log($stateParams);
    DataService.GetDetailForOrigin($stateParams.id,$stateParams.type).then(function(data){
      $scope.pcurrent=$stateParams.id;
      var chartdata= [['Donante','Montos',{role:'style'}, { role: 'annotation' } ]];
      angular.forEach(data, function(value){
        var dato=angular.fromJson(value);
        var aux=[];
        aux.push(dato.Label);
        aux.push(dato.Monto);
        aux.push('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
        aux.push(dato.Label);
        this.push(aux);
      }, chartdata);
      var MainChart = {};
      MainChart.methods={};
      MainChart.type = 'BarChart';
      MainChart.displayed = 'true';
      MainChart.data=chartdata;
      MainChart.options = {displayExactValues: true,width: 600,height: 200,chartArea: {left:10,top:10,bottom:0,height:'80%'},legend: 'none'};
      MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
      $scope.chart = MainChart;
    });

    $scope.onSelectRowFunction = function(){
      //$state.go('partido',{id: $scope.chart.data[selectedItem.row + 1][0]});
    };


  });
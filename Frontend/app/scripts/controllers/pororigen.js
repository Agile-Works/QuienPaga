'use strict';

angular.module('quienPagaApp')
  .controller('PorOrigenCtrl', function ($scope,$http,$stateParams,DataService,$state) {
    console.log($stateParams);
    DataService.GetDetailForOrigin($stateParams.id,$stateParams.type).then(function(data){
      $scope.pcurrent=$stateParams.id;
      $scope.pdonante={nombre :  $stateParams.nombre};
      var chartdata= [['Donante','Montos',{role:'style'}, { role: 'annotation' } ]];
      var datacolors=['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#aaaa11','#316395','#22aa99'];
      angular.forEach(data, function(value, index){
        var dato=angular.fromJson(value);
        var aux=[];
        aux.push(dato.Label);
        aux.push(dato.Monto);
        aux.push(datacolors[index]);
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

    $scope.onSelectRowFunction = function(selectedItem){
      $state.go('contribuyente',{nombre: $scope.chart.data[selectedItem.row + 1][0]});
    };


  });
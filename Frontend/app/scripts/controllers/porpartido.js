'use strict';

angular.module('quienPagaApp')
  .controller('PorPartidoCtrl', function ($scope,$http,$stateParams,DataService,$state) {
    DataService.GetOriginFor($stateParams.id).then(function(data){
      $scope.pcurrent={};
      $scope.pcurrent.name=$stateParams.id;
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
      MainChart.displayed = 'true';
      MainChart.data=chartdata;
      MainChart.options = {displayExactValues: true,width: 600,height: 200,is3D: false,pieHole:0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'},  vAxis: {title: 'Origen'},hAxis: {title: 'Montos'}};
      MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
      $scope.chart = MainChart;
    });

    $scope.onSelectRowFunction = function(selectedItem, partido){
      $state.go('origen',{id: partido, type:$scope.chart.data[selectedItem.row + 1][0]});
    };
  });
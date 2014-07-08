'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope,$http,$window,DataService, $state,$filter) {
    $scope.displayGif=true;

    DataService.GetAll().then(function(response){
      var chartdata=[['Partido','Montos']];
      angular.forEach($filter('groupBy')(response,'Partido'), function(value){
        var sum= 0;
        angular.forEach($filter('filter')(response,{'Partido':value}), function(value2){
          sum+=value2.Monto;
        });
        var aux=[];
        aux.push(value);
        aux.push(sum);
        this.push(aux);
      }, chartdata);
      var MainChart = {};
      MainChart.methods={};
      MainChart.type = 'PieChart';
      MainChart.data=chartdata;
      MainChart.options = {displayExactValues: true,width: 500,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}, colors: ['#109618','#ff9900','#dc3912','#990099','#3366cc']};
      MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
      $scope.chart = MainChart;
    });

    $scope.Selectores=DataService.GetSelectors();
    /*DataService.GetSelectors().then(function(response){
      $scope.Partido=angular.toJson(response.partidosector);
      console.log($scope.Partido);
    });
*/
    $scope.displayGif=false;

    $scope.onSelectRowFunction = function(selectedItem){
      $state.go('partido',{id: $scope.chart.data[selectedItem.row + 1][0]});
    };

 
  });
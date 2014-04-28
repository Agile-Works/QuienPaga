'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope) {
    var MainChart = {};
    MainChart.methods={};
    MainChart.type = 'PieChart';
    MainChart.data = [ ['FA', 'cost'],['PN', 50000],['PC', 80000],['AP', 60000],['PI',20000]];
    MainChart.options = {displayExactValues: true,width: 400,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}};
    MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
    $scope.chart = MainChart;
    $scope.chart.methods.select = function(selection, event){
      console.log('chartSelect in ctrl, selection: '+selection + ' Evt: ' + event);
    };
  });